```sql
create user '<uname>'@'localhost' identified with mysql_native_password by '<pass>';
create database rfsdb;
grant all privileges on rfsdb.* to '<uname>'@'<pass>';
flush privileges;
```

```sh
sudo mysql -u <uname>
```