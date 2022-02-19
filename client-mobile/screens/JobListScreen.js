import { Text, View, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { styles } from '../styling';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../queries/job';

export default function JobList({ navigation }) {
  const { loading, error, data } = useQuery(GET_JOBS)

  if (loading) {
    return <ActivityIndicator size='large' color='#00ff00' />
  }

  if (error) {
    return <Text>Something went wrong........</Text>
  }
  const toDetailJob = (jobId) => {
    navigation.navigate('DetailJob', { jobId })
  }

  const Card = ({ item }) => {
    return (
      <View style={styles.card} onTouchEnd={() => toDetailJob(item.id)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.Company.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Job List</Text>
      <FlatList
        data={data.getJobs}
        renderItem={Card}
        keyExtractor={item => item.id}
      />
    </View>
  );
}


