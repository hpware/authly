<script setup lang="ts">
import type { Todo, User, AdminStats } from '~/types';
import CheckSession from "~/lib/checkSession";

useSeoMeta({
    title: "Admin Dashboard | The Bottle TODO System!",
});

const router = useRouter();
const user = ref<User | null>(null);
const stats = ref<AdminStats>({
  totalUsers: 0,
  totalTodos: 0,
  completedTodos: 0,
  pendingTodos: 0
});
const todos = ref<Todo[]>([]);
const users = ref<User[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        const checkSessionSystem = await CheckSession();
        if (checkSessionSystem.loggedin !== true || checkSessionSystem.user.role !== 'admin') {
            router.push('/bottle');
            return;
        }
        user.value = checkSessionSystem.user;
        await Promise.all([fetchStats(), fetchTodos(), fetchUsers()]);
    } catch (err) {
        error.value = 'Failed to load admin dashboard';
        console.error('Admin dashboard error:', err);
    } finally {
        loading.value = false;
    }
});

const fetchStats = async () => {
    try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        stats.value = await response.json();
    } catch (err) {
        console.error('Error fetching stats:', err);
    }
};

const fetchTodos = async () => {
    try {
        const response = await fetch('/api/bottle/get_data');
        if (!response.ok) throw new Error('Failed to fetch todos');
        const data = await response.json();
        todos.value = data.todos || [];
    } catch (err) {
        console.error('Error fetching todos:', err);
    }
};

const fetchUsers = async () => {
    try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        users.value = await response.json();
    } catch (err) {
        console.error('Error fetching users:', err);
    }
};

const deleteTodo = async (todoId: string) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;

    try {
        const response = await fetch(`/api/bottle/delete_data?id=${todoId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete todo');
        todos.value = todos.value.filter(todo => todo.id !== todoId);
        await fetchStats();
    } catch (err) {
        alert('Failed to delete todo');
        console.error('Error deleting todo:', err);
    }
};

const logoutAction = async () => {
    try {
        const req = await fetch("/api/bye");
        const res = await req.json();
        if (res.true === "yes") {
            router.push("/cap");
            return;
        }
        alert("Logout failed");
    } catch (err) {
        alert("Logout failed");
        console.error('Logout error:', err);
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Navigation Header -->
        <header class="bg-white shadow-sm border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center space-x-4">
                        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <span class="text-sm text-gray-500">Welcome, {{ user?.username }}</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button
                            @click="router.push('/bottle')"
                            class="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Back to Todos
                        </button>
                        <button
                            @click="logoutAction"
                            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Error Message -->
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {{ error }}
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>

            <!-- Dashboard Content -->
            <div v-else class="space-y-8">
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-blue-100 rounded-lg">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Users</p>
                                <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-green-100 rounded-lg">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Todos</p>
                                <p class="text-2xl font-bold text-gray-900">{{ stats.totalTodos }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-purple-100 rounded-lg">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Completed</p>
                                <p class="text-2xl font-bold text-gray-900">{{ stats.completedTodos }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6">
                        <div class="flex items-center">
                            <div class="p-2 bg-yellow-100 rounded-lg">
                                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Pending</p>
                                <p class="text-2xl font-bold text-gray-900">{{ stats.pendingTodos }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Todos Management -->
                <div class="bg-white rounded-lg shadow">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">Manage Todos</h2>
                    </div>
                    <div class="p-6">
                        <div v-if="todos.length === 0" class="text-center py-8">
                            <p class="text-gray-500">No todos found.</p>
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="todo in todos" :key="todo.id">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ todo.title }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                                                class="px-2 py-1 text-xs font-medium rounded-full"
                                            >
                                                {{ todo.completed ? 'Completed' : 'Pending' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ new Date(todo.createdAt).toLocaleDateString() }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                @click="deleteTodo(todo.id)"
                                                class="text-red-600 hover:text-red-900 ml-2"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Users Management -->
                <div class="bg-white rounded-lg shadow">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">Manage Users</h2>
                    </div>
                    <div class="p-6">
                        <div v-if="users.length === 0" class="text-center py-8">
                            <p class="text-gray-500">No users found.</p>
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="userItem in users" :key="userItem.id">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ userItem.username }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ userItem.email }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span
                                                :class="userItem.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'"
                                                class="px-2 py-1 text-xs font-medium rounded-full"
                                            >
                                                {{ userItem.role }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Additional responsive styles if needed */
@media (max-width: 768px) {
    .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
