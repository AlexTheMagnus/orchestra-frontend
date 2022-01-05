import React from 'react';
import { ChooseModalParamList } from '../types/types';
import { StyleSheet } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import OrchestraColors from '../constants/OrchestraColors';

const ChooseSoundtrackTitleModal = ({
  isVisible,
  onSubmit,
  onClose
}: ChooseModalParamList) => {
  return (
    <DialogInput
      isDialogVisible={isVisible}
      title="Choose a title for your soundtrack"
      textInputProps={styles.modalTitle}
      submitText="Next"
      submitInput={onSubmit}
      closeDialog={onClose}
    />
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: OrchestraColors.textColor
  }
});

export default ChooseSoundtrackTitleModal;
