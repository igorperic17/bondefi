import TextReveal from "@/components/magicui/text-reveal";
export function TextRevealSection({ text }: { text: string }) {
    return (
        <div className="z-10 flex min-h-[16rem] max-h-[80rem] items-center justify-center rounded-lg">
            <TextReveal text={text} />
        </div>
    );
}
