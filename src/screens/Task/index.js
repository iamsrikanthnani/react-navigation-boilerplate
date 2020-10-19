import React from 'react';
import {View, Text, Button} from 'react-native';
import {AlertModal} from 'components/common';

const Task = ({}) => {
  const [isVisible, setVisible] = React.useState(false);
  return (
    <View>
      <Text>TaskManagement</Text>
      <Button title="Open modal" onPress={() => setVisible(true)} />
      <AlertModal
        visible={isVisible}
        title="Alert"
        message="This is description"
        actions={[
          {
            text: 'Đồng ý',
            onPress: () => {
              setVisible(false);
            },
          },
          {
            text: 'Huỷ bỏ',
            onPress: () => {},
          },
        ]}
      />
    </View>
  );
};

export default Task;
