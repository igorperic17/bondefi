import { randomBytes } from "crypto";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Rola, RolaError, SignedChallenge } from "@radixdlt/rola";
import { ResultAsync } from "neverthrow";

@Injectable()
export class RolaService {
  // A simple in-memory store for challenges. Should be good for now, we could eventually add to DB.
  private readonly challenges = new Map<string, { expires: number }>();

  private readonly rolaVerifier: (
    signedChallenge: SignedChallenge,
  ) => ResultAsync<void, RolaError>;

  constructor(config: ConfigService) {
    const { verifySignedChallenge } = Rola({
      applicationName: config.getOrThrow("radix.appName"),
      dAppDefinitionAddress: config.getOrThrow("radix.dAppDefinition"),
      networkId: config.getOrThrow("radix.networkId"), // network id of the Radix network
      expectedOrigin: config.getOrThrow("frontend.url"), // origin of the client making the wallet request
    });

    this.rolaVerifier = verifySignedChallenge;
  }

  getNewChallenge() {
    return this.createChallenge();
  }

  async verifySignedChallenges(
    signedChallenges: SignedChallenge[],
  ): Promise<boolean> {
    const challenges = [
      ...signedChallenges
        .reduce((acc, curr) => acc.add(curr.challenge), new Set<string>())
        .values(),
    ];
    const isChallengeValid = challenges.every((challenge) =>
      this.verifyChallengeIsValid(challenge),
    );

    if (!isChallengeValid) return false;

    const result = await ResultAsync.combine(
      signedChallenges.map((signedChallenge) =>
        this.rolaVerifier(signedChallenge),
      ),
    );

    if (result.isErr()) return false;

    // The signature is valid and the public key is owned by the user
    return true;
  }

  private createChallenge() {
    const challenge = this.generateSecureRandom(32); // 32 random bytes as hex string
    const expires = Date.now() + 1000 * 60 * 5; // expires in 5 minutes
    this.challenges.set(challenge, { expires }); // store challenge with expiration

    return challenge;
  }

  private verifyChallengeIsValid(input: string) {
    const challenge = this.challenges.get(input);

    if (!challenge) return false;

    this.challenges.delete(input); // remove challenge after it has been used
    const isValid = challenge.expires > Date.now(); // check if challenge has expired

    return isValid;
  }

  private generateSecureRandom(byteCount: number) {
    return randomBytes(byteCount).toString("hex");
  }
}
