-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2021-05-26 03:29:14
-- 服务器版本： 10.4.10-MariaDB
-- PHP 版本： 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `online_oj`
--

-- --------------------------------------------------------

--
-- 表的结构 `answer_details`
--

DROP TABLE IF EXISTS `answer_details`;
CREATE TABLE IF NOT EXISTS `answer_details` (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `question_id` int(11) NOT NULL COMMENT '题目id',
  `questionName` varchar(30) NOT NULL COMMENT '题目名称',
  `types` char(1) NOT NULL COMMENT '题目类型',
  `species` char(1) NOT NULL COMMENT '题目分类',
  `submit_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '提交时间',
  `state` varchar(15) NOT NULL COMMENT '状态',
  `memory` varchar(8) DEFAULT NULL COMMENT '使用内存',
  `time` varchar(8) DEFAULT NULL COMMENT '运行时间',
  `prog_language` varchar(8) DEFAULT NULL COMMENT '编程语言',
  `is_pass` tinyint(4) NOT NULL COMMENT '是否通过',
  KEY `user_id` (`user_id`,`question_id`),
  KEY `title_id` (`question_id`),
  KEY `types` (`types`),
  KEY `species` (`species`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='答题详情表';

-- --------------------------------------------------------

--
-- 表的结构 `class`
--

DROP TABLE IF EXISTS `class`;
CREATE TABLE IF NOT EXISTS `class` (
  `classId` int(11) NOT NULL AUTO_INCREMENT COMMENT '班级id',
  `teacherId` int(11) NOT NULL COMMENT '教师id',
  `teacherName` varchar(10) NOT NULL COMMENT '教师姓名',
  `className` varchar(20) NOT NULL COMMENT '班级名称',
  `classDescribe` varchar(30) NOT NULL COMMENT '班级描述',
  `isUse` tinyint(1) NOT NULL DEFAULT 1 COMMENT '班级是否存在',
  PRIMARY KEY (`classId`),
  KEY `teacherId` (`teacherId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='班级表';

-- --------------------------------------------------------

--
-- 表的结构 `classstudent`
--

DROP TABLE IF EXISTS `classstudent`;
CREATE TABLE IF NOT EXISTS `classstudent` (
  `studentId` int(11) NOT NULL COMMENT '学生id',
  `classId` int(11) NOT NULL COMMENT '班级id',
  `isUse` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否在班级',
  UNIQUE KEY `studentId_2` (`studentId`,`classId`),
  UNIQUE KEY `studentId_3` (`studentId`,`classId`),
  KEY `studentId` (`studentId`,`classId`),
  KEY `classId` (`classId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生班级表';

-- --------------------------------------------------------

--
-- 表的结构 `class_question`
--

DROP TABLE IF EXISTS `class_question`;
CREATE TABLE IF NOT EXISTS `class_question` (
  `classQuestionId` int(11) NOT NULL AUTO_INCREMENT COMMENT '班级题目id',
  `classId` int(11) NOT NULL COMMENT '班级id',
  `teacherId` int(11) NOT NULL COMMENT '教师id',
  `questionName` varchar(30) NOT NULL COMMENT '题目名称',
  `types` char(1) NOT NULL COMMENT '题目类型',
  `uploaderTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '上传时间',
  `isUse` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用',
  PRIMARY KEY (`classQuestionId`),
  KEY `classId` (`classId`),
  KEY `teacherId` (`teacherId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='班级题目表';

-- --------------------------------------------------------

--
-- 表的结构 `class_que_answer`
--

DROP TABLE IF EXISTS `class_que_answer`;
CREATE TABLE IF NOT EXISTS `class_que_answer` (
  `studentId` int(11) NOT NULL COMMENT '学生id',
  `classId` int(11) NOT NULL COMMENT '班级id',
  `classQuestionId` int(11) NOT NULL COMMENT '题目id',
  `questionName` varchar(30) NOT NULL COMMENT '题目名称',
  `studentName` varchar(20) NOT NULL COMMENT '学生姓名',
  `types` char(1) NOT NULL COMMENT '题目类型',
  `submitTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '提交时间',
  `IsPass` tinyint(1) NOT NULL COMMENT '是否通过',
  `memory` varchar(8) DEFAULT NULL COMMENT '运行时间',
  `time` varchar(8) DEFAULT NULL COMMENT '运行时间',
  KEY `studentId` (`studentId`,`classId`),
  KEY `classId` (`classId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='班级题目做题详情';

-- --------------------------------------------------------

--
-- 表的结构 `collection`
--

DROP TABLE IF EXISTS `collection`;
CREATE TABLE IF NOT EXISTS `collection` (
  `userId` int(11) NOT NULL COMMENT '用户id',
  `questionId` int(11) NOT NULL COMMENT '题目id',
  `type` char(1) NOT NULL COMMENT '题目类型',
  `isUse` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否收藏',
  `questionName` varchar(30) NOT NULL COMMENT '题目名称',
  KEY `userId` (`userId`,`questionId`),
  KEY `questionId` (`questionId`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏表';

-- --------------------------------------------------------

--
-- 表的结构 `species`
--

DROP TABLE IF EXISTS `species`;
CREATE TABLE IF NOT EXISTS `species` (
  `id` char(1) NOT NULL COMMENT '代表字母',
  `name` varchar(10) NOT NULL COMMENT '题目分类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='题目分类表';

--
-- 转存表中的数据 `species`
--

INSERT INTO `species` (`id`, `name`) VALUES
('A', '算法'),
('B', '数据结构'),
('C', '网络'),
('D', '其他');

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '学生id',
  `tel` char(11) NOT NULL COMMENT '电话',
  `username` varchar(25) NOT NULL COMMENT '用户名',
  `gender` char(1) DEFAULT NULL COMMENT '性别0|1',
  `school` varchar(20) DEFAULT NULL COMMENT '学校',
  `major` varchar(25) DEFAULT NULL COMMENT '专业',
  `class` varchar(30) DEFAULT NULL COMMENT '班级',
  `password` char(64) NOT NULL COMMENT '密码',
  `permission` char(1) NOT NULL DEFAULT '2' COMMENT '权限',
  `is_online` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否在线',
  `is_use` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用',
  `submit_times` int(11) NOT NULL DEFAULT 0 COMMENT '提交次数',
  `pass_times` int(11) NOT NULL DEFAULT 0 COMMENT '通过次数',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COMMENT='学生表';

-- --------------------------------------------------------

--
-- 表的结构 `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '教师id',
  `tel` char(11) NOT NULL COMMENT '电话',
  `userName` varchar(25) DEFAULT NULL COMMENT '昵称',
  `level` varchar(8) DEFAULT NULL COMMENT '职称',
  `school` varchar(20) DEFAULT NULL COMMENT '所属单位',
  `college` varchar(20) DEFAULT NULL COMMENT '所属学院',
  `major` varchar(15) DEFAULT NULL COMMENT '所属专业',
  `gender` char(1) DEFAULT NULL COMMENT '性别',
  `password` char(64) NOT NULL COMMENT '密码',
  `permission` char(1) NOT NULL DEFAULT '1' COMMENT '权限',
  `isOnline` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否在线',
  `isUse` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tel` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='教师表';

-- --------------------------------------------------------

--
-- 表的结构 `titles`
--

DROP TABLE IF EXISTS `titles`;
CREATE TABLE IF NOT EXISTS `titles` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '题目id',
  `name` varchar(30) NOT NULL COMMENT '题目名称',
  `difficulty` varchar(8) NOT NULL COMMENT '题目难度',
  `types` char(1) NOT NULL COMMENT '题目分类(选择or编程)',
  `species` char(1) NOT NULL COMMENT '题目种类',
  `uploader` int(11) NOT NULL COMMENT '提交者',
  `upload_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '上传时间',
  `filedir` varchar(10) NOT NULL COMMENT '题目保存文件目录',
  `submit_times` int(11) NOT NULL DEFAULT 0 COMMENT '提交次数',
  `pass_times` int(11) NOT NULL DEFAULT 0 COMMENT '通过次数',
  `is_use` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用',
  PRIMARY KEY (`id`),
  KEY `uploader` (`uploader`),
  KEY `first_class` (`types`),
  KEY `second_class` (`species`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='题目表';

-- --------------------------------------------------------

--
-- 表的结构 `types`
--

DROP TABLE IF EXISTS `types`;
CREATE TABLE IF NOT EXISTS `types` (
  `id` char(1) NOT NULL COMMENT '代表字母',
  `name` varchar(10) NOT NULL COMMENT '具体题型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='种类表';

--
-- 转存表中的数据 `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
('A', '选择题'),
('B', '编程题');

--
-- 限制导出的表
--

--
-- 限制表 `answer_details`
--
ALTER TABLE `answer_details`
  ADD CONSTRAINT `answer_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `answer_details_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `titles` (`id`),
  ADD CONSTRAINT `answer_details_ibfk_3` FOREIGN KEY (`types`) REFERENCES `types` (`id`),
  ADD CONSTRAINT `answer_details_ibfk_4` FOREIGN KEY (`species`) REFERENCES `species` (`id`);

--
-- 限制表 `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`);

--
-- 限制表 `classstudent`
--
ALTER TABLE `classstudent`
  ADD CONSTRAINT `classstudent_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `class` (`classId`),
  ADD CONSTRAINT `classstudent_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`);

--
-- 限制表 `class_question`
--
ALTER TABLE `class_question`
  ADD CONSTRAINT `class_question_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `class_question_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `class` (`classId`);

--
-- 限制表 `class_que_answer`
--
ALTER TABLE `class_que_answer`
  ADD CONSTRAINT `class_que_answer_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `class` (`classId`),
  ADD CONSTRAINT `class_que_answer_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`);

--
-- 限制表 `collection`
--
ALTER TABLE `collection`
  ADD CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `titles` (`id`),
  ADD CONSTRAINT `collection_ibfk_3` FOREIGN KEY (`type`) REFERENCES `types` (`id`);

--
-- 限制表 `titles`
--
ALTER TABLE `titles`
  ADD CONSTRAINT `titles_ibfk_1` FOREIGN KEY (`uploader`) REFERENCES `teachers` (`id`),
  ADD CONSTRAINT `titles_ibfk_2` FOREIGN KEY (`types`) REFERENCES `types` (`id`),
  ADD CONSTRAINT `titles_ibfk_3` FOREIGN KEY (`species`) REFERENCES `species` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
