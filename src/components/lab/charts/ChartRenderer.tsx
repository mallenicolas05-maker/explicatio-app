import { AC01AreaDefault } from "./AC01AreaDefault";
import { AC02AreaGradient } from "./AC02AreaGradient";
import { AC03AreaLinear } from "./AC03AreaLinear";
import { AC04AreaStacked } from "./AC04AreaStacked";
import { AC05AreaStep } from "./AC05AreaStep";
import { AC06AreaLegend } from "./AC06AreaLegend";
import { BC01BarDefault } from "./BC01BarDefault";
import { BC02BarLabel } from "./BC02BarLabel";
import { BC03BarActive } from "./BC03BarActive";
import { BC04BarHorizontal } from "./BC04BarHorizontal";
import { BC05BarMultiple } from "./BC05BarMultiple";
import { BC06BarMixed } from "./BC06BarMixed";
import { BC07BarStacked } from "./BC07BarStacked";
import { LC01LineDefault } from "./LC01LineDefault";
import { LC02LineDots } from "./LC02LineDots";
import { LC03LineMultiple } from "./LC03LineMultiple";
import { LC04LineLinear } from "./LC04LineLinear";
import { RC01RadarDots } from "./RC01RadarDots";
import { RC02RadarMultiple } from "./RC02RadarMultiple";

export type ChartRenderDatum = {
  day: string;
  value: number;
  secondary?: number;
  fill?: string;
}[];

export function ChartRenderer({ chartId, data }: { chartId: string; data: ChartRenderDatum }) {
  const props = { data };
  const mixedBarData = data.map((item) => ({
    ...item,
    fill: item.fill ?? "var(--chart-1)",
  }));
  switch (chartId) {
    case "AC-01":
      return <AC01AreaDefault {...props} />;
    case "AC-02":
      return <AC02AreaGradient {...props} />;
    case "AC-03":
      return <AC03AreaLinear {...props} />;
    case "AC-04":
      return <AC04AreaStacked {...props} />;
    case "AC-05":
      return <AC05AreaStep {...props} />;
    case "AC-06":
      return <AC06AreaLegend {...props} />;
    case "BC-01":
      return <BC01BarDefault {...props} />;
    case "BC-02":
      return <BC02BarLabel {...props} />;
    case "BC-03":
      return <BC03BarActive {...props} />;
    case "BC-04":
      return <BC04BarHorizontal {...props} />;
    case "BC-05":
      return <BC05BarMultiple {...props} />;
    case "BC-06":
      return <BC06BarMixed data={mixedBarData} />;
    case "BC-07":
      return <BC07BarStacked {...props} />;
    case "LC-01":
      return <LC01LineDefault {...props} />;
    case "LC-02":
      return <LC02LineDots {...props} />;
    case "LC-03":
      return <LC03LineMultiple {...props} />;
    case "LC-04":
      return <LC04LineLinear {...props} />;
    case "RC-01":
      return <RC01RadarDots {...props} />;
    case "RC-02":
      return <RC02RadarMultiple {...props} />;
    default:
      return <LC01LineDefault {...props} />;
  }
}
