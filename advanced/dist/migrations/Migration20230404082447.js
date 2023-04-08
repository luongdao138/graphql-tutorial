"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20230404082447 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20230404082447 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "password_hash" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
        this.addSql('create table "post" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "like_cnt" int not null default 0, "comment_cnt" int not null default 0, "upvote_cnt" int not null default 0, "downvote_cnt" int not null default 0, "user_id" varchar(255) null, constraint "post_pkey" primary key ("id"), constraint post_like_cnt_check check (like_cnt >= 0), constraint post_comment_cnt_check check (comment_cnt >= 0), constraint post_upvote_cnt_check check (upvote_cnt >= 0), constraint post_downvote_cnt_check check (downvote_cnt >= 0));');
        this.addSql('create table "post_evaluation" ("user_id" varchar(255) null, "post_id" varchar(255) null, "value" text check ("value" in (\'UPVOTE\', \'DOWNVOTE\')) not null, "created_at" timestamptz(0) not null, constraint "post_evaluation_pkey" primary key ("user_id", "post_id"));');
        this.addSql('alter table "post" add constraint "post_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
        this.addSql('alter table "post_evaluation" add constraint "post_evaluation_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
        this.addSql('alter table "post_evaluation" add constraint "post_evaluation_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;');
    }
    async down() {
        this.addSql('alter table "post" drop constraint "post_user_id_foreign";');
        this.addSql('alter table "post_evaluation" drop constraint "post_evaluation_user_id_foreign";');
        this.addSql('alter table "post_evaluation" drop constraint "post_evaluation_post_id_foreign";');
        this.addSql('drop table if exists "user" cascade;');
        this.addSql('drop table if exists "post" cascade;');
        this.addSql('drop table if exists "post_evaluation" cascade;');
    }
}
exports.Migration20230404082447 = Migration20230404082447;
//# sourceMappingURL=Migration20230404082447.js.map