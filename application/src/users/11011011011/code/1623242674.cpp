#include<iostream>
#include <vector>
#include<iomanip>
using namespace std;
#include<stdio.h>
int main(){
123

}int main()
{
	vector<int> year{ 1998, 2000, 2045, 3758, 2002, 1860, 1861, 1542, 1300, 2020 };
	vector<bool> result{ 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 };
	solution s;
	int passCount = 0;
	for (int i = 0; i < (int)year.size(); ++i) {
		if (result[i] == s.isLeapYear(year[i])) {
			passCount++;
		}
	}
	double res = (double)passCount * 100 / 10;
	cout << setiosflags(ios::fixed) << setprecision(1) << res;
	return 0;
}