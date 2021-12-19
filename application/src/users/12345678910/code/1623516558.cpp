#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;
class solution
{
public:
	int Add(int x, int y) {
		return x+y;
	}
};int main()
{
	solution s;
	vector<int> inputA{ 5, 43, 29, 8, 5 };
	vector<int> inputB{ 1, 4, 8, 9, 23 };
	vector<int> result{ 6, 47, 37, 17, 28 };
	int passCount = 0;
	int A;
	int B;
	int C;
	int D;
	for (int i = 0; i < 5; ++i) {
		if (result[i] != s.Add(inputA[i], inputB[i])) {
			A = inputA[i];
			B = inputB[i];
			C = result[i];
			D = s.Add(inputA[i], inputB[i]);
			break;
		}
		passCount++;
	}
	double res = (double)passCount * 100 / 5;
	if (passCount == 5) {
		cout << setiosflags(ios::fixed) << setprecision(1) << res;
	}
	else {
		cout << setiosflags(ios::fixed) << setprecision(1) << res << endl;
		string info = "用例输入："+to_string(A)+" "+to_string(B)+"\n"+"期望输出："+to_string(C)+"\n"+"实际输出："+to_string(D);
		cout << info;
	}
	return 0;
}
