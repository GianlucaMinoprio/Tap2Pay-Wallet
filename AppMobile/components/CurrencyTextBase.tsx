import React, { memo } from "react";

import Text, { MyTextProps } from "./Text";

import { Category_Types_Enum, Format_Types_Enum } from "constants/Type";
import numeral from "numeral";

export interface CurrencyTextProps extends MyTextProps {
  type?: Category_Types_Enum;
  formatType?: Format_Types_Enum;
}

const CurrencyTextBase = memo(
  ({
    children,
    type,
    formatType = Format_Types_Enum.Default,
    ...props
  }: CurrencyTextProps) => {
    const currency = "";

    const formatLimit = (amount: string, currency = "$") => {
      let textResult = `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00a"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00a");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatSaving = (
      amount: string,
      typeCategories = Category_Types_Enum.Income,
      currency = "$"
    ) => {
      let textResult = typeCategories === Category_Types_Enum.Income ? "" : "-";
      textResult += `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatInky = (
      amount: string,
      typeCategories = Category_Types_Enum.Income,
      currency = ""
    ) => {
      let textResult =
        typeCategories === Category_Types_Enum.Income ? "+" : "-";
      textResult += `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatDefault = (amount: string, currency = "") => {
      let textResult = `${currency}`;
      try {
        if (isNaN(parseFloat(amount))) {
          textResult += numeral(parseFloat(amount.replace(",", ""))).format(
            "0,0.00"
          );
        } else {
          textResult += numeral(parseFloat(amount)).format("0,0.00");
        }
      } catch (e) {
        console.log(e);
      }
      return textResult;
    };

    const formatSecure = (currency = "") => {
      return currency + "****";
    };

    return (
      <Text {...props}>
        {formatType === Format_Types_Enum.Limit
          ? formatLimit(children, currency)
          : formatType === Format_Types_Enum.Saving
          ? formatSaving(children, type, currency)
          : formatType === Format_Types_Enum.Inky
          ? formatInky(children, type, currency)
          : formatType === Format_Types_Enum.Default
          ? formatDefault(children, currency)
          : formatType === Format_Types_Enum.Secure
          ? formatSecure(currency)
          : formatDefault(children, currency)}
      </Text>
    );
  }
);

export default CurrencyTextBase;
