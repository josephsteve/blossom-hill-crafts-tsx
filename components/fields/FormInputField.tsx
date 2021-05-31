import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Label, Hint, Error } from '@progress/kendo-react-labels';

export const FormInputField = (fieldRenderProps: FieldRenderProps) => {
  const { validationMessage, touched, label, id, valid, disabled, hint, type, optional, wrapperStyle, ...others } = fieldRenderProps;

  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
      <div className={'k-form-field-wrap'}>
        <Input valid={valid} type={type} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
        { showHint && <Hint id={hintId}>{hint}</Hint> }
        { showValidationMessage && <Error id={errorId}>{validationMessage}</Error> }
      </div>
    </FieldWrapper>
  );
}
