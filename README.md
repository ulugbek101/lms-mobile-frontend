# Study Center and Private Schools Management App

## Overview
This mobile app is developed using **React Native** with **Expo**. It is designed to manage study centers and private schools by providing dashboards and tools to oversee staff, students, and parents effectively. The app supports multiple roles, each with their own unique interface and set of permissions.

## Key Features
- 📊 **Role-based Dashboard**: Five different roles - Superadmin, Admin, Teacher, Parent, and Student. Each role sees a custom dashboard tailored to their responsibilities.
- 🏫 **Comprehensive Management**: Manage attendance, assignments, video uploads, and communication between different users.
- 📩 **Notifications**: SMS notifications can be scheduled or sent directly by authorized roles (Superadmin and Admin). These include reminders for payments, absence alerts, and more.
- 📈 **Performance Tracking**: Parents can track their child’s grades, attendance, and overall school ranking.

## Roles and Access
### 1. 🛡️ Superadmin
- Full access to all features and dashboards.
- Can manage users, roles, and system settings.
- Can send SMS notifications.
- Can track income and monitor all workflows.

### 2. 🏢 Admin
- Similar to Superadmin but **without access to income, workflow monitoring, and dashboards**.
- Can send SMS notifications.

### 3. 👨‍🏫 Teacher
- Can assign homework and upload videos.
- Can check and grade homework submitted by students.
- Can mark student attendance.

### 4. 👨‍👩‍👧‍👦 Parent
- View their child’s attendance graph.
- Check their child’s average grades.
- Monitor their child’s overall ranking in the school.

### 5. 🎓 Student
- Access assignments and videos uploaded by teachers.
- Submit homework and track progress.

## Notifications and Communication
- **Types of Notifications**:
  - 💸 Payment reminders.
  - 🚨 Attendance alerts (e.g., when a student misses a class).
  - 📢 General school announcements.
- **Scheduled Notifications**:
  - 🕒 Automatic reminders for payment due dates.
  - 📅 Absence notifications triggered after attendance records are updated.

## Future Updates
- 📂 Dashboard types and additional features will be detailed later.
- 📊 Enhanced analytics and reporting.
- 🎥 Improved video upload and streaming features.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   cd <project-directory>
   npm install
   ```
3. Run the app:
   ```bash
   expo start
   ```

## Contribution
Feel free to contribute to this project by submitting pull requests or opening issues.

## License
This project is licensed under the MIT License.

