#include <sys/resource.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/wait.h>
#include <iostream>
#include <string>
using namespace std;



 int Compile(string& compileFile, string& runFile, string& errorFile)
        {
            //1.构造编译命令
            const int command_count = 10;
            char buf[command_count][60] = {{0}};
            char* command[command_count] = {0};
            for(int i = 0; i < command_count; ++i) {
                command[i] = buf[i];
            }
            snprintf(command[0], 59, "%s", "g++");
            snprintf(command[1], 59, "%s", compileFile.c_str());
            snprintf(command[2], 59, "%s", "-o");
            snprintf(command[3], 59, "%s", runFile.c_str());
            snprintf(command[4], 59, "%s", "-std=c++11");
            //snprintf(command[5], 59, "%s", "-D");
            //snprintf(command[6], 59, "%s", "CompileOnline");
            command[5] = NULL;
            //2.创建子进程 
            int pid = fork();
            if (pid < 0) {
				return 6;
            }
            else if (pid == 0) {
                //2.2 子进程  程序替换 
                int fd = open(errorFile.c_str(), O_CREAT | O_RDWR, 0777);
                if (fd < 0) {
                    exit(1);
                }
                //重定向
                dup2(fd, 2);
                //程序替换
                execvp(command[0], command);
                exit(0);
            }
            else {
                //2.1 父进程
                waitpid(pid, NULL, 0);
            }
            //3.验证是否生成可执行程序
            struct stat st;
            int ret = stat(runFile.c_str(), &st);
            if (ret < 0) {
                return 1;
            }
            return 7;
        }
		
		
		
        int Run(string& runFile, string& errorFile, string& outputFile)
        {

            //可执行程序
            //1.创建子进程
            int pid = fork();
            if (pid < 0) {
                return 6;
            }
            else if (pid == 0) {
                //对于子进程执行的限制
                //1.时间限制
                alarm(2);
                //2.内存限制
                struct rlimit rl;
                rl.rlim_cur = 1024 * 1024 * 32;
                rl.rlim_max = RLIM_INFINITY; //无限制
                setrlimit(RLIMIT_AS, &rl);

                //标准输出重定义到文件
                int stdoutFd = open(outputFile.c_str(), O_CREAT | O_RDWR, 0777);
                if (stdoutFd < 0) {
                    return 6;
                }
                dup2(stdoutFd, 1);

                //标准错误重定向到文件
                int stderrFd = open(errorFile.c_str(), O_CREAT | O_RDWR, 0777);
                if (stderrFd < 0) {
                    return 6;
                }
                dup2(stderrFd, 2);

                execl(runFile.c_str(), runFile.c_str(), NULL);
                exit(1);
            }
            int status = -1;
            waitpid(pid, &status, 0);
            //将是否收到信号的信息返回给调用者
			/*
			0-运行成功
			11-段错误
			14-运行超时
			*/
            return status & 0x7f;

        }

/*用户层
1-编译失败
2-段错误
3-运行超时
4-测试用例不通过
5-测试用例通过
6-内部错误
*/
int resNum[7] = {0, 1, 2, 3, 4, 5, 6};

/*系统层
0-运行成功
7-编译成功
11-段错误
14-运行超时
*/


int main(int argc, char* argv[])
{
    if (argc != 3) {
	    cout << resNum[5];
		return 0;
	}
	//获取程序参数
	string path = argv[1];
	string fileName = argv[2];
	string compileFile = path + fileName + ".cpp";
	string runFile = path + fileName;
	string errorFile = path + "error.txt";
	string outputFile = path + "output.txt";
	struct stat st;
    int ret = stat(compileFile.c_str(), &st);
    if (ret < 0) {
		cout << resNum[6];
        return 0;
    }
    //编译
    int compileCode = Compile(compileFile, runFile, errorFile);
	//编译通过
	if (compileCode == 7) {
		int runCode = Run(runFile, errorFile, outputFile);
		//运行通过
		if (runCode == 0) {
			cout << resNum[0];
		}
		//段错误
		if(runCode == 11) {
			cout << resNum[2];
		}
		//运行超时
		if (runCode == 14) {
			cout << resNum[3];
		}
		return 0;
	}
	//编译失败
	if (compileCode == 1) {
		cout << resNum[1];
	}
	//内部错误
	if (compileCode == 6) {
		cout << resNum[6];
	}
	return 0;
}

       