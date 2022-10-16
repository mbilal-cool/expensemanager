import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
const AbstractModal = props => {
  const defHeight = props.height ? props.height : 200;
  // const defWidth = props.width ? props.width : SW * 0.53
  const defWidth = props.width ? props.width : 320;

  return (
    <Modal
      backdropColor="#131313"
      backdropOpacity={0.8}
      animationIn="zoomIn"
      animationOut="fadeOut"
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      transparent={true}
      isVisible={props.isVisible}>
      <TouchableWithoutFeedback
        activeOpacity={1}
        style={{
          width: '100%',
          height: '100%',
        }}
        onPress={() => props.setShowModal(false)}>
        <React.Fragment>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  //   height: props.autoHeight ? undefined : defHeight,
                  width: defWidth,
                },
              ]}>
              {props.children}
            </View>
          </View>
        </React.Fragment>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AbstractModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    paddingVertical: 0,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: 10,
  },
});
