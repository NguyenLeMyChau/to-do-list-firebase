import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import Header from '../components/header/Header';
import TextInputForm from '../components/input/TextInputForm';
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, setDoc, collection, addDoc, getDocs, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, FIREBASE_AUTH } from '../config/firebaseConfig.js';
import { query, where } from 'firebase/firestore';

const ToDoList = ({navigation}) => {
    const auth = FIREBASE_AUTH;
    const user = auth.currentUser;
    const [task, setTask] = useState('');
    const [data, setData] = useState([]);
    const [editTaskValue, setEditTaskValue] = useState('');
    const [editingTaskId, setEditTaskId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // Fetch tasks
    const fetchTasks = async () => {
        const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const tasks = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setData(tasks);
    };

    // Subscribe to tasks: Xử lý realtime khi có sự thay đổi từ Firestore
    const subscribeToTasks = () => {
        const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
        return onSnapshot(q, (snapshot) => {
            const tasks = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setData(tasks);
        });
    };

    useEffect(() => {
        fetchTasks();

        const unsubscribe = subscribeToTasks();

        // Cleanup khi component unmount
        return () => {
            unsubscribe();
        };
    }, []);

    // Add task
    const addTask = async () => {
        try {
            await addDoc(collection(db, 'tasks'), {
                taskname: task,
                checked: false,
                time: new Date(),
                userId: user.uid, // Lưu trữ ID người dùng
            });
            setTask('');
        } catch (error) {
            alert("Error adding document: ", error);
        }
    };
    // Remove task
    const removeTask = async (taskId) => {
        const taskRef = doc(db, 'tasks', taskId);

        try {
            await deleteDoc(taskRef);
            alert("Document successfully deleted!");
        } catch (e) {
            alert("Error deleting document: ", e);
        }
    }

    // Update task
    const updateTask = async (taskId, newTaskData) => {
        const taskRef = doc(db, 'tasks', taskId);

        try {
            await updateDoc(taskRef, newTaskData);
            setModalVisible(false);
            alert("Document successfully updated!");
        } catch (e) {
            alert("Error updating document: ", e.message);
        }
    };

    // Custom checkbox component: Dùng để render checkbox với trạng thái checked hoặc unchecked 
    const CustomCheckBox = ({ isChecked, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
                {isChecked ? (
                    <AntDesign name="checksquare" size={24} color="green" />
                ) : (
                    <AntDesign name="checksquareo" size={24} color="gray" />
                )}
            </TouchableOpacity>
        );
    };

    // Handle checkbox toggle: Dùng để toggle trạng thái checked hoặc unchecked của checkbox
    const toggleCheckbox = (itemId) => {
        const item = data.find((task) => task.id === itemId);
        updateTask(itemId, { checked: !item.checked });
    };

    return (
        <View style={styles.container}>
            <Header  username={user ? user.displayName : 'your name'} navigation={navigation}/>
            <View style={styles.body}>
                <TextInputForm
                    placeholder={'What do you want to do?'}
                    value={task}
                    onChangeText={setTask}
                    IconEnd={AntDesign}
                    nameIconEnd={'plus'}
                    onPressIconEnd={addTask}
                />

                <ScrollView>
                    {data.map((task) => (
                        <View key={task.id} style={styles.taskItem}>
                            <CustomCheckBox
                                isChecked={task.checked}
                                onPress={() => toggleCheckbox(task.id)}
                                style={styles.checkbox}
                            />
                            <Text style={task.checked ? styles.completedTask : styles.notCompletedTask}>{task.taskname}</Text>
                            <AntDesign name="edit" size={24} color="#36648B" onPress={() => { setEditTaskId(task.id); setEditTaskValue(task.taskname); setModalVisible(true); }} style={{ width: '13%' }} />
                            <AntDesign name="delete" size={24} color="#36648B" onPress={() => removeTask(task.id)} />
                        </View>
                    ))}
                </ScrollView>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInputForm
                            placeholder={'Enter new task'}
                            value={editTaskValue}
                            onChangeText={setEditTaskValue}
                            IconEnd={AntDesign}
                            nameIconEnd={'download'}
                            onPressIconEnd={() => updateTask(editingTaskId, { taskname: editTaskValue })}
                        />

                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: 'medium',
        color: '#36648B'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
    body: {
        flex: 1,
        padding: 20,
    },
    taskItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    completedTask: {
        width: '70%',
        textDecorationLine: 'line-through',
    },
    notCompletedTask: {
        width: '70%',
        textDecorationLine: 'none',
    },
    checkboxContainer: {
        marginRight: 10,
    },
    flexend: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#36648B',
        borderRadius: 50,
        marginLeft: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 350
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#36648B',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

});

export default ToDoList;