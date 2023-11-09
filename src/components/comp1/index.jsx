import styles from "./Comp1.module.scss";
import { Button, Select } from "antd";
import { StepForwardOutlined } from "@ant-design/icons";
export default function comp1() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className={styles.comp1}>
      comp1
      <Button type="primary">Button</Button>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
      <StepForwardOutlined style={{ fontSize: 20 }} />
    </div>
  );
}
