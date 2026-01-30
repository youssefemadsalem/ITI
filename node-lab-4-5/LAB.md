# Express.js Lab: Posts Resource & Validation

## 📋 Lab Overview

In this lab, you will extend the existing Express.js demo application by:
1. Creating a complete **Posts** resource following the same architecture pattern as Users
2. Implementing **validation schemas** for all routes (Users and Posts)
3. **(Bonus)** Adding **pagination, search, and sorting** to listing routes

---

## 🎯 Learning Objectives

By the end of this lab, you should be able to:
- Create a complete CRUD resource following MVC architecture
- Implement request validation using Zod schemas
- Handle validation errors properly
- Implement advanced query features (pagination, search, sorting)

---

## 📁 Project Structure Reference

Your project follows this structure:
```
src/
├── controllers/     # Request handlers
├── services/       # Business logic
├── models/         # Mongoose models
├── routes/         # Route definitions
├── schemas/        # Zod validation schemas
├── middlewares/    # Express middlewares
├── types/          # TypeScript types/interfaces
└── utils/          # Utility functions
```

---

## 🚀 Part 1: Create Posts Resource

### Step 1.1: Define Post Types

Create `src/types/posts.ts` and define the Post interface:

**Requirements:**
- `title`: string (required, min 3 characters)
- `content`: string (required, min 10 characters)
- `author`: ObjectId reference to User (required)
- `tags`: array of strings (optional)
- `published`: boolean (default: false)
- `createdAt` and `updatedAt`: timestamps (handled by Mongoose)

**Hint:** Look at `src/types/index.ts` for the User interface pattern.

---

### Step 1.2: Create Post Model

Create `src/models/posts.ts`:

**Requirements:**
- Use Mongoose schema with the fields defined above
- Add `timestamps: true` option
- Create an index on `author` field
- Create an index on `published` field
- Export the model as default

**Example structure:**
```typescript
import mongoose from 'mongoose';
import { IPostDocument } from '../types/posts';

const postSchema = new mongoose.Schema<IPostDocument>({
    // Your schema definition here
}, {
    timestamps: true,
});

// Add indexes here

const Post = mongoose.model<IPostDocument>("posts", postSchema);
export default Post;
```

---

### Step 1.3: Create Post Service

Create `src/services/post.service.ts`:

**Required Methods:**
1. `getAllPosts()` - Get all posts (exclude author password if populated)
2. `getPostById(id: string)` - Get a single post by ID
3. `createPost(post: IPost)` - Create a new post
4. `updatePost(id: string, post: Partial<IPost>)` - Update a post
5. `deletePost(id: string)` - Delete a post

**Hint:** Follow the pattern in `src/services/user.service.ts`. Use `find()`, `findOne()`, `create()`, `findOneAndUpdate()`, and `findOneAndDelete()`.

---

### Step 1.4: Create Post Controller

Create `src/controllers/posts.controller.ts`:

**Required Methods:**
1. `getAllPosts` - Handle GET `/api/v1/posts`
2. `getPostById` - Handle GET `/api/v1/posts/:id`
3. `createPost` - Handle POST `/api/v1/posts`
4. `updatePost` - Handle PATCH `/api/v1/posts/:id`
5. `deletePost` - Handle DELETE `/api/v1/posts/:id`

**Response Format:**
- Success: `{ message: "...", data: ... }`
- Error: Handled by errorHandler middleware

**Hint:** Follow the pattern in `src/controllers/users.controller.ts`. Use appropriate HTTP status codes (200, 201, 404).

---

### Step 1.5: Create Post Routes

Create `src/routes/posts.routes.ts`:

**Required Routes:**
- `GET /` - Get all posts
- `GET /:id` - Get post by ID
- `POST /` - Create a new post
- `PATCH /:id` - Update a post
- `DELETE /:id` - Delete a post

**Hint:** Follow the pattern in `src/routes/users.routes.ts`. Import and use the PostsController.

---

### Step 1.6: Register Posts Routes

Update `src/index.ts`:
- Import the posts routes
- Register them at `/api/v1/posts`

**Example:**
```typescript
import postsRoutes from './routes/posts.routes';
// ...
app.use("/api/v1/posts", postsRoutes);
```

---

## ✅ Part 2: Implement Validation Schemas

### Step 2.1: Create Post Validation Schemas

Create `src/schemas/posts.ts`:

**Required Schemas:**

1. **`createPostSchema`** - For POST `/api/v1/posts`
   - `body`: 
     - `title`: string, min 3 characters, max 200 characters
     - `content`: string, min 10 characters
     - `author`: string (MongoDB ObjectId format)
     - `tags`: array of strings (optional)
     - `published`: boolean (optional, default: false)

2. **`updatePostSchema`** - For PATCH `/api/v1/posts/:id`
   - `params`: `id` - string (MongoDB ObjectId format)
   - `body`: All fields optional (use `.partial()` or `.optional()`)

3. **`getPostByIdSchema`** - For GET `/api/v1/posts/:id`
   - `params`: `id` - string (MongoDB ObjectId format)

4. **`deletePostSchema`** - For DELETE `/api/v1/posts/:id`
   - `params`: `id` - string (MongoDB ObjectId format)

**Hint:** Look at `src/schemas/users.ts` for the pattern. Use `z.string().regex()` for MongoDB ObjectId validation or `z.string().length(24)`.

**Example:**
```typescript
import { z } from "zod";
import { IGenralSchema } from "../types";

const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

export const createPostSchema: IGenralSchema = {
    body: z.object({
        title: z.string().min(3).max(200),
        content: z.string().min(10),
        author: z.string().regex(mongoIdRegex, "Invalid author ID format"),
        tags: z.array(z.string()).optional(),
        published: z.boolean().optional().default(false),
    })
};
```

---

### Step 2.2: Add Validation to Post Routes

Update `src/routes/posts.routes.ts`:
- Add `validateSchema` middleware to all routes that need validation
- Import validation schemas from `src/schemas/posts`

**Example:**
```typescript
import validateSchema from "../middlewares/validator";
import { createPostSchema, updatePostSchema, getPostByIdSchema, deletePostSchema } from "../schemas/posts";

router.post("/", validateSchema(createPostSchema), PostsController.createPost);
router.get("/:id", validateSchema(getPostByIdSchema), PostsController.getPostById);
// ... etc
```

---

### Step 2.3: Add Validation to User Routes

Update `src/routes/users.routes.ts`:
- Add validation schemas for routes that are missing them:
  - `getUserByIdSchema` - For GET `/api/v1/users/:id`
  - `updateUserSchema` - For PATCH `/api/v1/users/:id`
  - `deleteUserSchema` - For DELETE `/api/v1/users/:id`

**Create these schemas in `src/schemas/users.ts`:**

```typescript
export const getUserByIdSchema: IGenralSchema = {
    params: z.object({
        id: z.string().regex(mongoIdRegex, "Invalid user ID format")
    })
};

export const updateUserSchema: IGenralSchema = {
    params: z.object({
        id: z.string().regex(mongoIdRegex, "Invalid user ID format")
    }),
    body: z.object({
        name: z.string().min(3).optional(),
        email: z.string().email("Invalid email address").optional(),
        age: z.number().min(18).max(100).optional(),
    })
};

export const deleteUserSchema: IGenralSchema = {
    params: z.object({
        id: z.string().regex(mongoIdRegex, "Invalid user ID format")
    })
};
```

Then update the routes:
```typescript
router.get("/:id", validateSchema(getUserByIdSchema), UsersController.getUserById);
router.patch("/:id", validateSchema(updateUserSchema), UsersController.updateUser);
router.delete("/:id", validateSchema(deleteUserSchema), UsersController.deleteUser);
```

---

## 🎁 Bonus: Pagination, Search & Sorting

### Bonus 1: Add Pagination to Listing Routes

**Update `getAllUsers` and `getAllPosts`:**

1. **Update Service Methods:**
   - Accept `page` and `limit` parameters
   - Use `skip()` and `limit()` for pagination
   - Return both data and pagination metadata

2. **Update Controller Methods:**
   - Extract `page` and `limit` from query parameters
   - Default values: `page = 1`, `limit = 10`
   - Return pagination info in response

3. **Create Query Schemas:**
   - `getAllUsersSchema` and `getAllPostsSchema` with query validation:
     - `page`: number, min 1, optional (default: 1)
     - `limit`: number, min 1, max 100, optional (default: 10)

**Example Response:**
```json
{
  "message": "Users fetched successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

**Service Example:**
```typescript
static async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
        User.find({}, { password: 0 }).skip(skip).limit(limit),
        User.countDocuments()
    ]);
    
    return {
        data: users,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}
```

---

### Bonus 2: Add Search Functionality

**Add search to `getAllUsers` and `getAllPosts`:**

1. **For Users:**
   - Search by `name` or `email`
   - Use MongoDB `$or` operator with regex

2. **For Posts:**
   - Search by `title` or `content`
   - Use MongoDB `$or` operator with regex

**Update Query Schemas:**
- Add `search` parameter: string, optional

**Service Example:**
```typescript
static async getAllUsers(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    const query: any = {};
    
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }
    
    const [users, total] = await Promise.all([
        User.find(query, { password: 0 }).skip(skip).limit(limit),
        User.countDocuments(query)
    ]);
    
    return {
        data: users,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}
```

---

### Bonus 3: Add Sorting

**Add sorting to `getAllUsers` and `getAllPosts`:**

1. **For Users:**
   - Sort by: `name`, `email`, `age`, `createdAt`
   - Default: `createdAt` descending

2. **For Posts:**
   - Sort by: `title`, `createdAt`, `published`
   - Default: `createdAt` descending

**Update Query Schemas:**
- Add `sortBy` parameter: string (enum of allowed fields)
- Add `sortOrder` parameter: string ('asc' or 'desc'), default: 'desc'

**Service Example:**
```typescript
static async getAllUsers(
    page: number = 1, 
    limit: number = 10, 
    search?: string,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
) {
    const skip = (page - 1) * limit;
    const query: any = {};
    const sort: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    
    // ... search logic ...
    
    const [users, total] = await Promise.all([
        User.find(query, { password: 0 })
            .sort(sort)
            .skip(skip)
            .limit(limit),
        User.countDocuments(query)
    ]);
    
    // ... return ...
}
```

---

## 🧪 Testing Your Implementation

### Test Cases for Posts:

1. **Create Post:**
   ```bash
   POST http://localhost:3000/api/v1/posts
   {
     "title": "My First Post",
     "content": "This is the content of my first post",
     "author": "507f1f77bcf86cd799439011",
     "tags": ["tech", "nodejs"],
     "published": true
   }
   ```

2. **Get All Posts (with pagination/search/sorting):**
   ```bash
   GET http://localhost:3000/api/v1/posts?page=1&limit=5&search=nodejs&sortBy=createdAt&sortOrder=desc
   ```

3. **Get Post by ID:**
   ```bash
   GET http://localhost:3000/api/v1/posts/{postId}
   ```

4. **Update Post:**
   ```bash
   PATCH http://localhost:3000/api/v1/posts/{postId}
   {
     "title": "Updated Title",
     "published": false
   }
   ```

5. **Delete Post:**
   ```bash
   DELETE http://localhost:3000/api/v1/posts/{postId}
   ```

### Test Validation Errors:

- Try creating a post with invalid data (short title, invalid author ID, etc.)
- Try accessing routes with invalid MongoDB ObjectId format
- Verify error messages are clear and helpful

---

## 📝 Checklist

### Part 1: Posts Resource
- [ ] Created `src/types/posts.ts` with IPost interface
- [ ] Created `src/models/posts.ts` with Post model
- [ ] Created `src/services/post.service.ts` with all CRUD methods
- [ ] Created `src/controllers/posts.controller.ts` with all handlers
- [ ] Created `src/routes/posts.routes.ts` with all routes
- [ ] Registered posts routes in `src/index.ts`
- [ ] Tested all CRUD operations

### Part 2: Validation
- [ ] Created `src/schemas/posts.ts` with all validation schemas
- [ ] Added validation middleware to all post routes
- [ ] Created missing user validation schemas
- [ ] Added validation middleware to all user routes
- [ ] Tested validation errors

### Bonus: Advanced Features
- [ ] Implemented pagination for users listing
- [ ] Implemented pagination for posts listing
- [ ] Implemented search for users listing
- [ ] Implemented search for posts listing
- [ ] Implemented sorting for users listing
- [ ] Implemented sorting for posts listing
- [ ] Updated query validation schemas
- [ ] Tested all bonus features

---

## 💡 Tips & Hints

1. **MongoDB ObjectId Validation:**
   - Use regex: `/^[0-9a-fA-F]{24}$/`
   - Or use a library like `mongoose.Types.ObjectId.isValid()`

2. **Error Handling:**
   - The errorHandler middleware will catch validation errors automatically
   - Make sure your validation schemas throw proper errors

3. **TypeScript Types:**
   - Keep your types consistent across models, services, and controllers
   - Use `Partial<IPost>` for update operations

4. **Mongoose Queries:**
   - Use `findOneAndUpdate` with `{ new: true }` to return updated document
   - Use `select()` to exclude fields (e.g., password)
   - Use `populate()` if you want to include author details in posts

5. **Testing:**
   - Use Postman, Thunder Client, or curl to test your API
   - Test both success and error cases
   - Verify error messages are user-friendly

---

## 🎓 Expected Outcomes

After completing this lab, you should have:

1. ✅ A fully functional Posts resource with CRUD operations
2. ✅ Complete validation on all routes (Users and Posts)
3. ✅ Proper error handling for validation errors
4. ✅ **(Bonus)** Advanced query features (pagination, search, sorting)

---

## 📚 Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Zod Documentation](https://zod.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Query Operators](https://docs.mongodb.com/manual/reference/operator/query/)

---

**Good luck! 🚀**
