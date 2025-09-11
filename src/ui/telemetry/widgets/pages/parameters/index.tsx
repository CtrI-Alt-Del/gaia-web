import { ParametersPageView } from "./parameters-page-view";
import { useParameters } from "./use-parameters";

export default function Parameters() {
  const parametersData = useParameters();

  return <ParametersPageView {...parametersData} />;
}