# Motor Vehicle Inventory System

A comprehensive web-based system for managing motor vehicle inventory with user authentication and role-based access control.

## Features

### 🚗 Vehicle Management
- Add new vehicles with detailed information
- View and search vehicle inventory
- Filter by condition, location, center, and driver
- Bulk import via Excel upload
- Edit and update vehicle records
- Track vehicle condition and maintenance

### 👥 User Management
- Role-based access control (Admin/User)
- User registration and authentication
- Profile management
- Password reset functionality
- Session management with timeout

### 📊 Dashboard
- Real-time vehicle statistics
- Recent entries overview
- Quick action buttons
- Search and filter capabilities

## Database Structure

### Users Table
- **id**: Primary key (auto increment)
- **fullname**: User's full name
- **email**: Unique email address
- **username**: Unique username
- **password**: Hashed password
- **role**: User role (admin/user)
- **is_active**: Account status
- **reset_token**: Password reset token
- **reset_expires**: Token expiration
- **created_at**: Account creation timestamp
- **updated_at**: Last update timestamp

### Vehicles Table
- **id**: Primary key (auto increment)
- **old_property_number**: Legacy property number
- **description**: Vehicle description
- **acquired_date**: Acquisition date
- **estimated_life**: Estimated life in years
- **center**: Respective center/office
- **acquisition_cost**: Original cost
- **carrying_amount**: Current book value
- **new_property_number**: New property number (unique)
- **location**: Current location
- **condition_status**: Vehicle condition (excellent/good/fair/poor)
- **driver_name**: Assigned driver
- **registered_name**: Name in PAR
- **certificate_number**: Certificate number
- **remarks**: Additional notes
- **created_by**: User who created record
- **date_added**: Creation timestamp
- **last_modified**: Last update timestamp

## Installation

1. **Database Setup**
   ```sql
   -- Run the database_setup.sql file in your MySQL/MariaDB server
   mysql -u root -p < database_setup.sql
   ```

2. **Configure Database Connection**
   - Update `php/db.php` with your database credentials
   - Default database name: `vehicle_inventory`

3. **Default Login Credentials**
   - **Admin**: username: `admin`, password: `Admin123!`
   - **User**: username: `testuser`, password: `Admin123!`

4. **File Permissions**
   - Ensure PHP has write permissions for uploads directory
   - Set appropriate permissions for session handling

## Usage

### For Administrators
- Manage all vehicles in the system
- Create and manage user accounts
- Access all system features
- View comprehensive reports

### For Standard Users
- Add new vehicles
- View and search vehicle inventory
- Update own profile
- Limited access based on role

## Security Features

- Password hashing using PHP's `password_hash()`
- SQL injection prevention with prepared statements
- Session management with timeout
- Role-based access control
- Input validation and sanitization
- CSRF protection ready

## File Structure

```
/
├── css/                 # Stylesheets
├── js/                  # JavaScript files
├── php/                 # PHP backend files
├── images/              # Image assets
├── supabase/migrations/ # Database migration files
├── uploads/             # File upload directory
└── index.html           # Main login page
```

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.