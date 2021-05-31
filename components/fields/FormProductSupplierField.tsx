import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import React from 'react';
import { DropDownList, ListItemProps } from '@progress/kendo-react-dropdowns';
import { classNames } from '@progress/kendo-react-common';
import styles from '@/styles/Product.module.scss';
import { Error, Hint, Label } from '@progress/kendo-react-labels';

export const FormProductSupplierField = (props: FieldRenderProps) => {

  const { suppliers, validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle } = props;

  const itemRender = (el: React.ReactElement<HTMLLIElement>, props: ListItemProps) => (
    <el.type {...el.props} className={classNames('pl-2', el.props.className, styles['ddl-list-item'], { [styles['k-state-selected']]: props.selected })}>
      <span className="ml-3">{props.dataItem.display_name}</span>
    </el.type>
  );

  const valueRender = (el: any, value: any) => (
    <el.type {...el.props} className={classNames("pl-2", el.props.className, styles['ddl-list-item'])}>
      {value ? <span className="ml-3">{value.display_name}</span> : null}
    </el.type>)

  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';

  const handleSupplierChange = React.useCallback(
    (event) => {
      if (props.onChange) {
        props.onChange.call(undefined, { value: event.target.value.id })
      }
    },
    [props.onChange]
  )

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
      <DropDownList key={'formproductsupplier'} data={suppliers} itemRender={itemRender} valueRender={valueRender} ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef}
                    value={suppliers.find((i: any) => i.id === props.value)} textField={'display_name'}
                    onChange={handleSupplierChange} valid={valid} id={id} disabled={disabled} />
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>

  );
}
