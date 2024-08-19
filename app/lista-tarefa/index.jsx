import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    taskItem: {
        padding: 15
    },
    taskText: {
        fontSize: 18,
    },
    completedTaskText: {
        fontSize: 18,
        textDecorationLine: "line-through",
        color: "gray",
    },
    list: {
        fontSize: 25
    },
});

const TaskItem = ({ task, onPress }) => (
    <TouchableOpacity onPress={() => onPress(task.id)}>
        <View style={styles.taskItem}>
            <Text style={task.completed ? styles.completedTaskText : styles.taskText}>
                {task.name}
            </Text>
        </View>
    </TouchableOpacity>
);

export default function ListaTarefa() {
    const [tasks, setTasks] = useState([
        { id: "1", name: "Jogar Valorant", completed: false, created_at:20/4/2005},
        { id: "2", name: "Ser gay", completed: true },
        { id: "3", name: "Jogar de novo", completed: false },
    ]);

    const toggleTaskCompletion = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.list}>Lista de tarefas</Text>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TaskItem task={item} onPress={toggleTaskCompletion} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}
