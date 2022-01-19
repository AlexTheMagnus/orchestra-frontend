import React from 'react';
import { ChooseModalParamList } from '../types/types';
import DialogInput from 'react-native-dialog-input';

const ChooseSoundtrackTitleModal = ({
  isVisible,
  onSubmit,
  onClose
}: ChooseModalParamList) => {
  return (
    <DialogInput
      isDialogVisible={isVisible}
      title="Choose a title for your soundtrack"
      submitText="Next"
      submitInput={onSubmit}
      closeDialog={onClose}
    />
  );
};

export default ChooseSoundtrackTitleModal;
