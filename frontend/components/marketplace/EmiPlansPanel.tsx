"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/formatters";

interface EmiPlan {
  id: string;
  tenureMonths: number;
  interestRate: number;
  monthlyAmount: number;
  cashbackAmount: number;
  isNoCost: boolean;
}

interface EmiPlansPanelProps {
  plans: EmiPlan[];
  productPrice: number;
  onSelectPlan: (plan: EmiPlan) => void;
  selectedPlanId?: string;
}

export default function EmiPlansPanel({
  plans,
  productPrice,
  onSelectPlan,
  selectedPlanId,
}: EmiPlansPanelProps) {
  const [expanded, setExpanded] = useState(true);

  const lowestEmi = plans.reduce(
    (min, p) => (p.monthlyAmount < min.monthlyAmount ? p : min),
    plans[0]
  );

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Panel Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 active:bg-gray-50 transition-colors"
      >
        <div className="text-left">
          <p className="text-xs text-gray-400 font-medium">Starts at</p>
          <p className="text-base font-bold text-gray-900">
            {formatPrice(lowestEmi?.monthlyAmount ?? 0)}
            <span className="text-sm font-normal text-gray-500">/mo</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-[#712CDC]">
            {expanded ? "Hide plans" : "View plans"}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#712CDC"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* EMI Plan Rows */}
      {expanded && (
        <div className="divide-y divide-gray-50">
          {plans.map((plan, index) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                onClick={() => onSelectPlan(plan)}
                className={`w-full flex items-center px-4 py-3 text-left transition-colors emi-row ${
                  isSelected ? "bg-[#F5F0FD]" : "hover:bg-gray-50"
                } ${index === plans.length - 1 ? "" : ""}`}
              >
                {/* Radio indicator */}
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mr-3 flex items-center justify-center transition-all ${
                    isSelected ? "border-[#712CDC]" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#712CDC]" />
                  )}
                </div>

                {/* Left: tenure + rate */}
                <div className="flex-1">
                  <span className="text-sm text-gray-700 font-medium">
                    {plan.tenureMonths} months
                  </span>
                  <span className="text-sm text-gray-400"> · </span>
                  <span
                    className={`text-sm font-medium ${
                      plan.isNoCost ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {plan.interestRate === 0
                      ? "0% p.a."
                      : `${plan.interestRate}% p.a.`}
                  </span>
                </div>

                {/* Right: monthly amount */}
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">
                    {formatPrice(plan.monthlyAmount)}
                  </span>
                  <span className="text-xs text-gray-400"> /mo</span>
                  {plan.cashbackAmount > 0 && (
                    <div className="flex items-center justify-end gap-0.5 mt-0.5">
                      <span className="text-[10px] font-semibold text-green-600">
                        + {formatPrice(plan.cashbackAmount)} cashback
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Total amount note */}
      {expanded && (
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Product price:{" "}
            <span className="font-semibold text-gray-600">
              {formatPrice(productPrice)}
            </span>{" "}
            · No processing fees
          </p>
        </div>
      )}
    </div>
  );
}
