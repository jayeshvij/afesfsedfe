# QuickCommerce Backend

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

## Running the Application

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID

### Cart
- `GET /api/cart` - Get user's cart items
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/{productId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID

### Admin
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

### Store Owner
- `GET /api/store/orders` - Get pending orders
- `PUT /api/store/orders/{id}/pack` - Mark order as packed
- `PUT /api/store/orders/{id}/assign-driver` - Assign driver to order

### Driver
- `GET /api/driver/orders` - Get assigned orders
- `PUT /api/driver/orders/{id}/deliver` - Mark order as delivered

## Default Credentials
- User: user@qcom / user123
- Admin: admin@qcom / admin123
- Store Owner: store@qcom / store123
- Driver: driver@qcom / driver123

## Database
The application uses H2 in-memory database. You can access the H2 console at `http://localhost:8080/h2-console` with:
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: `password`
