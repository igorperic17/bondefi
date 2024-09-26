import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export enum ActionType {
    Buy = 'buy',
    Sell = 'sell',
    Refund = 'refund'
}

interface InvestmentDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    tokenName: string;
    tokenSymbol: string;
    amount: string;
    resultAmount: number;
    onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onConfirm: () => void;
    actionType: ActionType;
    maxAmount?: number;
}

export const InvestmentDialog: React.FC<InvestmentDialogProps> = ({
    isOpen,
    onOpenChange,
    tokenName,
    tokenSymbol,
    amount,
    resultAmount,
    onAmountChange,
    onConfirm,
    actionType,
    maxAmount
}) => {
    const getDialogTitle = () => {
        switch (actionType) {
            case ActionType.Buy: return `Invest in ${tokenName}`;
            case ActionType.Sell: return `Sell ${tokenName}`;
            case ActionType.Refund: return `Refund ${tokenName}`;
        }
    };

    const getDialogDescription = () => {
        switch (actionType) {
            case ActionType.Buy: return "Enter the amount you want to invest. You will receive an NFT which you can use later to claim your tokens.";
            case ActionType.Sell: return "Enter the amount of tokens you want to sell.";
            case ActionType.Refund: return "Enter the amount of tokens you want to refund.";
        }
    };

    const getInputLabel = () => {
        switch (actionType) {
            case ActionType.Buy: return "Investment ($)";
            case ActionType.Sell:
            case ActionType.Refund: return `Amount (${tokenSymbol})`;
        }
    };

    const getResultLabel = () => {
        switch (actionType) {
            case ActionType.Buy: return "Tokens to receive";
            case ActionType.Sell:
            case ActionType.Refund: return "USD to receive";
        }
    };

    const getConfirmButtonText = () => {
        switch (actionType) {
            case ActionType.Buy: return "Confirm Investment";
            case ActionType.Sell: return "Confirm Sale";
            case ActionType.Refund: return "Confirm Refund";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{getDialogTitle()}</DialogTitle>
                    <DialogDescription>{getDialogDescription()}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            {getInputLabel()}
                        </Label>
                        <Input
                            id="amount"
                            value={amount}
                            onChange={onAmountChange}
                            className="col-span-3"
                            max={maxAmount}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">{getResultLabel()}</Label>
                        <div className="col-span-3">
                            {resultAmount.toFixed(2)} {actionType === ActionType.Buy ? tokenSymbol : '$'}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onConfirm}>{getConfirmButtonText()}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
