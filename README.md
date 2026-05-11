# TMGM Training Portal

TMGM + Chelsea 风格员工 8 天入职培训系统 Demo。

## 功能
- 登录页：员工 / 管理员两类角色
- 员工后台：Day 1 - Day 8 独立课程卡片、综合学习模块
- Day 1：公司产品篇课程框架
- 管理员后台：员工进度、有效学习时间、最后操作时间、Excel 导出
- 防挂机计时：无鼠标移动、点击、滚动、键盘操作超过 60 秒暂停计时

## 本地运行
```bash
npm install
npm run dev
```

打开：
```txt
http://localhost:3000
```

## 测试账号
管理员：
- admin@tmgm.com / admin123

员工：
- simon@tmgm.com / 123456
- trainee@tmgm.com / 123456

## GitHub 部署到 Vercel
1. 上传整个项目到 GitHub
2. 打开 Vercel，Import Git Repository
3. Framework 选择 Next.js
4. Deploy

## 后续正式化建议
当前 Demo 使用 localStorage 存储学习进度。正式上线建议接入 Supabase / PostgreSQL：
- users
- courses
- course_modules
- progress_records
- activity_logs
