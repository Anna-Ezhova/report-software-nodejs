import { DEPARTMENT_DATA } from "@/config";
import { SelectItem } from "@/components/ui/select";

const DepartmentSelect = () => {
  const selectItems = DEPARTMENT_DATA.map(({ label, value }) => {
    return (
      <SelectItem key={value} value={value}>
        {" "}
        {label}{" "}
      </SelectItem>
    );
  });

  return selectItems;
};

export default DepartmentSelect;
