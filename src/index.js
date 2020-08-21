import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

const App = () => {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('projects').then( response => {
      setProjects(response.data);
    }).catch(error => console.log("Something went wrong on the request", error));
  }, []);

  const addProjectHandler = async () => {
    const response = await api.post('projects', { 
      title: `React Project ${Date.now()}`,
      owner: `Bomuto`
    });

    const project = response.data;
    setProjects([...projects, project])
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.project}>
              {project.title}
            </Text>
          )}
        />

        <TouchableOpacity
          onPress={addProjectHandler}
          activeOpacity={0.7} 
          style={styles.button}>
          <Text style={styles.buttonText}>Add a project</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1'
  },

  project: {
    color: '#fff',
    fontSize: 30
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default App;
