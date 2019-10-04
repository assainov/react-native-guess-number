import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

const AlertModal = props => (
  <Modal {...props}>
    <TouchableOpacity
      style={styles.modal}
      activeOpacity={1}
      onPressOut={() => {
        props.resetModal();
      }}
    >
      <TouchableWithoutFeedback>
        <View style={{ ...props.style, ...styles.window }}>{props.children}</View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  window: {
    backgroundColor: '#FFF',
    width: '80%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});

AlertModal.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  transparent: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  resetModal: PropTypes.func.isRequired,
};

export default AlertModal;
