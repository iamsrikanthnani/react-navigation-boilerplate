import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actions, selectors} from 'redux-toolkit/Task';

const Task = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(0);
  const dispatch = useDispatch();
  const allTask = useSelector(selectors.selectAll);
  const total = useSelector(selectors.selectTotal);

  useEffect(() => {
    setIsLoading(true);
    getData();
    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    const apiUrl = `https://proxibox-pharma-api-staging.enouvo.com/api/v1/notifications?limit=10&offset=${pageCurrent}`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDg3YmU3LTQwZWEtNGU1Ny05ZGZiLTQwZDJlMWQ0NjI5MSIsImZpcnN0TmFtZSI6IkphbWVzIiwibGFzdE5hbWUiOiJEYW5pYSIsImVtYWlsIjoiaGlldS50cmFuKzEzQGVub3V2by5jb20iLCJzeXN0ZW1Sb2xlIjoidXNlciIsImJ1c2luZXNzUm9sZSI6bnVsbCwiYnVzaW5lc3NJZCI6bnVsbCwidHRsIjo2MDQ4MDAwMDAsImlhdCI6MTYwNTk2OTczMX0.CYMd2h4xovfZVSEiLy3ySOGwPnBHvW6xJchN4iUKImo',
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        setIsLoading(false);
        dispatch(actions.taskAddMany(resJson.results));
      });
  };

  const handleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemRow} key={index}>
        <Image
          source={{uri: `https://picsum.photos/200/200?random=${index}`}}
          style={styles.itemImage}
        />
        <Text style={styles.itemText}>{item.message}</Text>
        <Text style={styles.itemText}>{item.id}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={allTask}
      stickyHeaderIndices={[0]}
      renderItem={renderItem}
      ListHeaderComponent={() => {
        return (
          <View style={{width: '100%', backgroundColor: 'white'}}>
            <Text>{total}</Text>
          </View>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={1}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f5fcff',
  },
  itemRow: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Task;
