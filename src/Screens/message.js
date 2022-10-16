import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';

import {fetchUsers} from '../utils/Redux/Slices/messageSlices';
import {useDispatch, useSelector} from 'react-redux';
import {Fonts, lightThemeColors} from '../theme';

const Users = () => {
  const dispatch = useDispatch();
  const {users, loading} = useSelector(state => state.users);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.main}>
      {/* <TO title={'Reload'} onPress={() => dispatch(fetchUsers())} />
       */}

      {users?.map(user => {
        return (
          <View style={styles.container} key={user.id}>
            <View>
              <View style={styles.dataContainer}>
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    backgroundColor: 'green',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={{uri: user.avatar}}
                    style={{height: '100%', width: '100%', borderRadius: 30}}
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text>
                    {user.first_name}
                    {user.last_name}
                  </Text>
                  <Text>{user.email}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => dispatch(fetchUsers())}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: lightThemeColors.red1,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Reload
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Users;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 30,
    // backgroundColor: 'green',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  dataContainer: {
    flexDirection: 'row',
  },
});
