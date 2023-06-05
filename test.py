import numpy as np

x = np.array([1, 2, 5, 9, 18, 36, 73, 146, 292, 584])
y = np.array([12800, 6400, 3200, 1600, 800, 400, 200, 100, 50, 25])

coefficients = np.polyfit(x, y, 2)  # ทำการประมาณค่า a, b, และ c

#a = coefficients[0]
#b = coefficients[1]
#c = coefficients[2]

#print("a =", a)
#print("b =", b)
#print("c =", c)

a = 0.052849055008978636
b = -37.857948757848696
c = 4568.711433528903

x=1
print(a*(x^2)+b*x+c)