import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ActionType = 'buy' | 'sell' | 'refund';

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
            case 'buy': return `Invest in ${tokenName}`;
            case 'sell': return `Sell ${tokenName}`;
            case 'refund': return `Refund ${tokenName}`;
        }
    };

    const getDialogDescription = () => {
        switch (actionType) {
            case 'buy': return "Enter the amount you want to invest. You will receive an NFT which you can use later to claim your tokens.";
            case 'sell': return "Enter the amount of tokens you want to sell.";
            case 'refund': return "Enter the amount of tokens you want to refund.";
        }
    };

    const getInputLabel = () => {
        switch (actionType) {
            case 'buy': return "Investment ($)";
            case 'sell': case 'refund': return `Amount (${tokenSymbol})`;
        }
    };

    const getResultLabel = () => {
        switch (actionType) {
            case 'buy': return "Tokens to receive";
            case 'sell': case 'refund': return "USD to receive";
        }
    };

    const getConfirmButtonText = () => {
        switch (actionType) {
            case 'buy': return "Confirm Investment";
            case 'sell': return "Confirm Sale";
            case 'refund': return "Confirm Refund";
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
                            {resultAmount.toFixed(2)} {actionType === 'buy' ? tokenSymbol : '$'}
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
