<template>
  <div class="panel">
    <h2>Пользователи по ролям</h2>
    <Bar v-if="usersChartData" :data="usersChartData" :options="chartOptions" />

    <h2>Посты по пользователям</h2>
    <Bar v-if="postsChartData" :data="postsChartData" :options="chartOptions" />

    <h2>Комментарии по постам</h2>
    <Bar v-if="commentsChartData" :data="commentsChartData" :options="chartOptions" />

    <h2>Сообщения по пользователям</h2>
    <Bar v-if="messagesChartData" :data="messagesChartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { apiFetch } from '../api';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const usersChartData = ref<any>(null);
const postsChartData = ref<any>(null);
const commentsChartData = ref<any>(null);
const messagesChartData = ref<any>(null);

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: false }
  }
});

onMounted(async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [usersRes, postsRes, commentsRes, messagesRes] = await Promise.all([
    apiFetch(`${apiUrl}/api/users`),
    apiFetch(`${apiUrl}/api/posts`),
    apiFetch(`${apiUrl}/api/comments`),
    apiFetch(`${apiUrl}/api/messages`)
  ]);

  const usersData = (await usersRes.json()).data;
  const postsData = (await postsRes.json()).data;
  const commentsData = (await commentsRes.json()).data;
  const messagesData = (await messagesRes.json()).data;

  // Пользователи по ролям
  const roleCounts: Record<string, number> = {};
  usersData.forEach((user: any) => {
    roleCounts[user.role] = (roleCounts[user.role] || 0) + 1;
  });
  usersChartData.value = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: 'Пользователи',
        data: Object.values(roleCounts),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']
      }
    ]
  };

  // Посты по пользователям
  const postsCounts: Record<string, number> = {};
  postsData.forEach((post: any) => {
    postsCounts[post.user_id] = (postsCounts[post.user_id] || 0) + 1;
  });
  postsChartData.value = {
    labels: Object.keys(postsCounts).map(uid => 'User ' + uid),
    datasets: [
      {
        label: 'Посты',
        data: Object.values(postsCounts),
        backgroundColor: '#42A5F5'
      }
    ]
  };

  // Комментарии по постам
  const commentsCounts: Record<string, number> = {};
  commentsData.forEach((comment: any) => {
    commentsCounts[comment.post_id] = (commentsCounts[comment.post_id] || 0) + 1;
  });
  commentsChartData.value = {
    labels: Object.keys(commentsCounts).map(pid => 'Post ' + pid),
    datasets: [
      {
        label: 'Комментарии',
        data: Object.values(commentsCounts),
        backgroundColor: '#66BB6A'
      }
    ]
  };

  // Сообщения по пользователям (отправителям)
  const messagesCounts: Record<string, number> = {};
  messagesData.forEach((msg: any) => {
    messagesCounts[msg.sender_id] = (messagesCounts[msg.sender_id] || 0) + 1;
  });
  messagesChartData.value = {
    labels: Object.keys(messagesCounts).map(uid => 'User ' + uid),
    datasets: [
      {
        label: 'Сообщения',
        data: Object.values(messagesCounts),
        backgroundColor: '#FFA726'
      }
    ]
  };
});
</script>

<style scoped>
.panel {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
