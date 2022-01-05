import React from 'react';
import { ChooseModalParamList } from '../types/types';
import { StyleSheet } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import OrchestraColors from '../constants/OrchestraColors';

const ChooseChapterTitleModal = ({
  isVisible,
  onSubmit,
  onClose
}: ChooseModalParamList) => {
  return (
    <DialogInput
      isDialogVisible={isVisible}
      title="Choose a title for your chapter"
      textInputProps={styles.textInput}
      submitText="Next"
      submitInput={onSubmit}
      closeDialog={onClose}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: OrchestraColors.textColor
  }
});

export default ChooseChapterTitleModal;
