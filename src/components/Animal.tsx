import { AnimalData, StatName } from "../types/AnimalData.ts";
import { Button } from "./Button.tsx";
import {
  maxStatValue,
  minStatValue,
  statConfig,
  StatDecayType,
} from "../config/config.ts";
import { clsx } from "clsx";
import { Heading } from "./Heading.tsx";
import { FormattedMessage, useIntl } from "react-intl";

type AnimalProps = AnimalData & {
  onBoostStat: (statName: StatName) => void;
};

export function Animal({
  type: { labelId, imgSrc, imgAltMessageId },
  name,
  hunger,
  happiness,
  sleepiness,
  onBoostStat,
}: AnimalProps) {
  const intl = useIntl();

  return (
    <>
      <div className="mx-auto w-[350px] rounded-xl bg-white p-5 pt-0 text-center text-green-800">
        <Heading level={1} className="pb-4">
          {name}
        </Heading>
        <div className="mx-auto mb-5 w-fit">
          <img
            src={imgSrc}
            alt={intl.formatMessage({
              id: imgAltMessageId,
              defaultMessage: "",
            })}
            className="h-[150px] w-[150px] rounded-full object-cover"
          />
          <h2 className="pb-4 text-center text-2xl text-green-800">
            <FormattedMessage id={labelId} defaultMessage={labelId} />
          </h2>
        </div>
        <div className="mt-5 flex">
          <Stat
            label={intl.formatMessage({
              id: "stat-name-hunger",
              defaultMessage: "Hunger",
            })}
            buttonLabel={intl.formatMessage({
              id: "stat-name-hunger-boost-btn",
              defaultMessage: "Feed",
            })}
            value={hunger}
            decayType={statConfig.hunger.decayType}
            onClick={() => onBoostStat("hunger")}
          />
          <Stat
            label={intl.formatMessage({
              id: "stat-name-happiness",
              defaultMessage: "Happiness",
            })}
            buttonLabel={intl.formatMessage({
              id: "stat-name-happiness-boost-btn",
              defaultMessage: "Play",
            })}
            value={happiness}
            decayType={statConfig.happiness.decayType}
            onClick={() => onBoostStat("happiness")}
          />
          <Stat
            label={intl.formatMessage({
              id: "stat-name-sleepiness",
              defaultMessage: "Sleepiness",
            })}
            buttonLabel={intl.formatMessage({
              id: "stat-name-sleepiness-boost-btn",
              defaultMessage: "Rest",
            })}
            value={sleepiness}
            decayType={statConfig.sleepiness.decayType}
            onClick={() => onBoostStat("sleepiness")}
          />
        </div>
      </div>
    </>
  );
}

function Stat({
  label,
  buttonLabel,
  value,
  onClick,
  decayType,
}: {
  label: string;
  buttonLabel: string;
  value: number;
  onClick: () => void;
  decayType: StatDecayType;
}) {
  return (
    <div data-testid="stat" className="mb-5 flex-1 p-2.5">
      <strong>{label}</strong>
      <div className="mt-2.5 h-5 w-full overflow-hidden rounded bg-gray-300">
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={minStatValue}
          aria-valuemax={maxStatValue}
          className={clsx("h-full transition-all duration-300 ease-in-out", {
            "bg-green-500": decayType === "reduce",
            "bg-red-500": decayType === "increase",
          })}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <Button onClick={onClick}>{buttonLabel}</Button>
    </div>
  );
}
