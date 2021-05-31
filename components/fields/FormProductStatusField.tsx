import { FieldRenderProps, FieldWrapper } from '@progress/kendo-react-form';
import React from 'react';
import { Label, Error, Hint } from '@progress/kendo-react-labels';
import { DropDownList, ListItemProps } from '@progress/kendo-react-dropdowns';
import { classNames } from '@progress/kendo-react-common';
import styles from '@/styles/Product.module.scss';

export const FormProductStatusField = (props: FieldRenderProps) => {

  const { statuses, validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = props;

  const StatusItemRender = (el: React.ReactElement<HTMLLIElement>, props: ListItemProps) => (
    <el.type {...el.props} className={classNames('pl-2', el.props.className, styles['ddl-list-item'], { [styles['k-state-selected']]: props.selected })}>
      <span className="ml-3">{props.dataItem}</span>
    </el.type>
  );

  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';

  return (
    <FieldWrapper style={wrapperStyle}>
      <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
      <DropDownList data={statuses} itemRender={StatusItemRender} ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef}
                    valid={valid} id={id} disabled={disabled} {...others}/>
      {showHint && <Hint id={hintId}>{hint}</Hint>}
      {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
    </FieldWrapper>

  );
}
