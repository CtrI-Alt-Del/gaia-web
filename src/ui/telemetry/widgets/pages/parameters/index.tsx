import { ParametersPageView } from "./parameters-page-view";
import { useParametersPage } from "./use-parameters-page";
import { ParameterModal } from "@/ui/telemetry/widgets/components/parameter-modal";

export default function Parameters() {
  const parametersData = useParametersPage();

  return (
    <>
      <ParametersPageView {...parametersData} />
      <ParameterModal
        isOpen={parametersData.isModalOpen}
        onClose={parametersData.onCloseModal}
      />
    </>
  );
}