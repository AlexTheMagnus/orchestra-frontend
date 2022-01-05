import React from 'react';
import { Dialog, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import OrchestraColors from '../constants/OrchestraColors';
import TextButton from './TextButton';

const ConfirmDeleteModal = ({
  isVisible,
  onDismiss,
  onConfirm
}: {
  isVisible: boolean;
  onDismiss(): void;
  onConfirm(): void;
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          {'Are you sure you want to\n delete it?'}
        </Dialog.Title>
        <Dialog.Actions style={styles.dialogActions}>
          <TextButton
            style={styles.dialogCancelButton}
            message={'Cancel'}
            onPress={onDismiss}
          />
          <TextButton
            style={styles.dialogDeleteButton}
            message={'Delete'}
            onPress={onConfirm}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogActions: {
    justifyContent: 'space-evenly'
  },
  dialogDeleteButton: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 10,
    color: OrchestraColors.secondaryColor
  },
  dialogCancelButton: {
    fontSize: 25,
    padding: 10
  }
});

export default ConfirmDeleteModal;
