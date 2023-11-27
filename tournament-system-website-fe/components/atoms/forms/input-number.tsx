import InputView, { InputViewType } from "./input.view";

function NumberInputComponent(props: InputViewType) {
  const NumberChange = (event: any) => (event.target.value = event.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"));
  return <InputView {...props} onInput={NumberChange} readOnly={props.readOnly} />;
}

export default NumberInputComponent;
