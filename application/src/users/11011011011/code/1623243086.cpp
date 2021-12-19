#include <iostream>
#include <vector>
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
	vector<int> inputA{ 1, 4, 8, 9, 23, 85, 7, -3, 0, 10000 };
	vector<int> inputB{ 5, 43, 29, 8, 5, 610, 0, 56, 73, 485 };
	vector<int> result{ 6, 47, 37, 17, 28, 695, 7, 53, 73, 10485 };
	int passCount = 0;
	for (int i = 0; i < 10; ++i) {
		if (result[i] == s.Add(inputA[i], inputB[i])) {
			passCount++;
		}
	}
	double res = (double)passCount * 100 / 10;
	cout << setiosflags(ios::fixed) << setprecision(1) << res;
	return 0;
}
