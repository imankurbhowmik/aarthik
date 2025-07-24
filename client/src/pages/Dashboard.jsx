import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Card, CardContent, Separator } from "../components/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#FFBB28"];

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState(null);
  const [monthlyCat, setMonthlyCat] = useState(null);
  const [monthlySource, setMonthlySource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await api.get("/api/analytics/summary" , {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res2 = await api.get("/api/analytics/monthly-trend" , {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res3 = await api.get("/api/analytics/monthly-category-breakdown" , {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res4 = await api.get("/api/analytics/monthly-source-breakdown" , {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res1.data);
      setTrend(res2.data);
      setMonthlyCat(res3.data);
      setMonthlySource(res4.data);
    };
    fetchData(token);
  }, []);

  if (!summary || !trend || !monthlyCat || !monthlySource) { 
    return <div className="flex flex-col items-center justify-center h-[70vh] text-center">
  <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
  <h2 className="text-lg font-semibold text-gray-600">Fetching insights...</h2>
  <p className="text-sm text-gray-400">Hang tight, we’re analyzing your data.</p>
</div>

  } 

  return (
    <div className="p-4 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent><h2 className="text-xl font-semibold">💰 Total Income</h2><p className="text-2xl">₹{summary.totalIncome}</p></CardContent></Card>
        <Card><CardContent><h2 className="text-xl font-semibold">💸 Total Expense</h2><p className="text-2xl">₹{summary.totalExpense}</p></CardContent></Card>
        <Card><CardContent><h2 className="text-xl font-semibold">🧾 Balance</h2><p className="text-2xl">₹{summary.balance}</p></CardContent></Card>
      </div>

      <Separator />

      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">📈 Monthly Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend.months.map((m, i) => ({
            month: m,
            income: trend.income[i],
            expense: trend.expense[i],
          }))}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} />
            <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">📂 Expenses by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={Object.entries(summary.categoryBreakdown).map(([name, value]) => ({ name, value }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {Object.keys(summary.categoryBreakdown).map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">📥 Incomes by Source</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={Object.entries(summary.sourceBreakdown).map(([name, value]) => ({ name, value }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {Object.keys(summary.sourceBreakdown).map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Category Breakdown StackedBar */}
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">📊 Monthly Category Breakdown</h2>

      {Object.keys(monthlyCat).length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.keys(monthlyCat).map((month) => ({
              month,
              ...monthlyCat[month],
            }))}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            {(() => {
              // Get all unique categories across all months
              const categorySet = new Set();
              Object.values(monthlyCat).forEach((monthObj) => {
                Object.keys(monthObj).forEach((cat) => categorySet.add(cat));
              });
              const categoryKeys = [...categorySet];

              return categoryKeys.map((cat, idx) => (
                <Bar
                  key={cat}
                  dataKey={cat}
                  stackId="a"
                  fill={COLORS[idx % COLORS.length]}
                />
              ));
            })()}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>


      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card><CardContent><h2 className="text-lg font-semibold">🔝 Top Expense Category</h2><p className="text-xl">{Object.entries(summary.categoryBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}</p></CardContent></Card>
        <Card><CardContent><h2 className="text-lg font-semibold">🏦 Top Income Source</h2><p className="text-xl">{Object.entries(summary.sourceBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}</p></CardContent></Card>
      </div>
    </div>
  );
};

export default Dashboard;
