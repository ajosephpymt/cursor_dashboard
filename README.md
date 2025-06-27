# Cursor Internal Dashboard

A modern, responsive internal dashboard for tracking Cursor user engagement and performance metrics. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Key Metrics Tracking
- **User Activity Monitoring**: Identify users who haven't used Cursor in the last X days
- **Performance Leaderboard**: Track users with the most edits, tabs, and sessions
- **Real-time Analytics**: Visualize daily activity trends with interactive charts
- **Engagement Insights**: Monitor session duration and user engagement rates

### Dashboard Components
- 📊 **Metric Cards**: Key performance indicators with trend indicators
- 📈 **Activity Charts**: Line charts showing daily edits and tabs activity
- 🏆 **Leaderboard**: Sortable table of top-performing users
- ⚠️ **Inactive Users**: List of users who haven't been active recently
- ⚙️ **Filter Controls**: Adjustable thresholds and sorting options

### Technical Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **TypeScript**: Full type safety and better development experience
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Sortable tables, clickable user rows, and dynamic filtering
- **Mock Data**: Realistic sample data for demonstration purposes

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cursor-internal-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the dashboard.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MetricCard.tsx   # Metric display cards
│   ├── UserTable.tsx    # Sortable user tables
│   ├── ActivityChart.tsx # Activity visualization charts
│   └── FilterControls.tsx # Dashboard filter controls
├── data/               # Data management
│   └── mockData.ts     # Mock data and metrics calculation
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 📊 Dashboard Features

### User Activity Tracking
- **Inactive User Detection**: Automatically identifies users who haven't been active for a configurable number of days
- **Activity Thresholds**: Adjustable inactivity periods (1, 3, 7, 14, 30, 60 days)
- **Visual Indicators**: Inactive users are highlighted with red backgrounds

### Performance Leaderboard
- **Multiple Sort Options**: Sort by edits, tabs, sessions, or last active date
- **Real-time Updates**: Data updates automatically when filters change
- **User Details**: Click on any user row to view detailed information

### Analytics Visualization
- **Daily Activity Charts**: Line charts showing trends over the last 30 days
- **Edits vs Tabs**: Separate charts for different activity types
- **Interactive Tooltips**: Hover over chart points for detailed information

### Filtering and Controls
- **Dynamic Filtering**: Change inactivity thresholds on the fly
- **Sort Configuration**: Customize leaderboard sorting preferences
- **Real-time Updates**: All components update immediately when filters change

## 🔧 Configuration

### Customizing Inactivity Thresholds
The dashboard allows you to set custom inactivity periods:
- Navigate to the "Dashboard Filters" section
- Select your desired "Inactive Days Threshold"
- The dashboard will automatically update to reflect the new criteria

### Sorting Options
Customize how the leaderboard is displayed:
- **Sort By**: Choose between edits, tabs, sessions, or last active date
- **Sort Order**: Ascending or descending order
- **Real-time Updates**: Changes apply immediately

## 📈 Metrics Explained

### Key Performance Indicators
- **Total Users**: Complete user base count
- **Active Users**: Users active within the selected threshold
- **Total Edits**: Cumulative edits across all users
- **Total Tabs**: Cumulative tabs opened across all users

### Engagement Metrics
- **Average Session Duration**: Mean time spent in Cursor per session
- **Engagement Rate**: Percentage of users active in the selected period
- **Inactive User Percentage**: Proportion of users not meeting activity criteria

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Static Hosting
The built files in the `dist/` directory can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🔄 Data Integration

### Replacing Mock Data
To integrate with real data sources:

1. **Update Data Sources**: Modify `src/data/mockData.ts` to fetch from your API
2. **API Integration**: Replace mock functions with actual API calls
3. **Real-time Updates**: Implement WebSocket or polling for live data updates

### Example API Integration
```typescript
// Replace mock data with API calls
const fetchUserData = async () => {
  const response = await fetch('/api/users');
  return response.json();
};

const fetchActivityData = async () => {
  const response = await fetch('/api/activity');
  return response.json();
};
```

## 🎨 Customization

### Styling
- **Tailwind CSS**: All styling uses Tailwind utility classes
- **Custom Colors**: Cursor brand colors are defined in `tailwind.config.js`
- **Component Theming**: Easy to customize colors and spacing

### Adding New Metrics
1. **Define Types**: Add new interfaces in `src/types/index.ts`
2. **Create Components**: Build new metric components in `src/components/`
3. **Update Dashboard**: Integrate new components in `src/App.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**Built with ❤️ for the Cursor team** 