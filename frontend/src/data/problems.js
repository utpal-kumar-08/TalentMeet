export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Hash map for O(n) solution
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Talent IQ - Live Execution Demo
console.log("Two Sum Results:");
console.log("Test 1:", twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log("Test 2:", twoSum([3, 2, 4], 6));      // Expected: [1, 2]`,
      python: `# Talent IQ - Python Solution Template
def twoSum(nums, target):
    visited = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in visited:
            return [visited[complement], i]
        visited[num] = i
    return []

# Run Demo
print("Running Two Sum Solution...")
print("Result 1:", twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print("Result 2:", twoSum([3, 2, 4], 6))       # Expected: [1, 2]`,
      java: `import java.util.*;

// Talent IQ requires the class to be named 'Main'
public class Main {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println("Processing Two Sum...");
        System.out.println("Test 1: " + Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
        System.out.println("Test 2: " + Arrays.toString(twoSum(new int[]{3, 2, 4}, 6)));
    }
}`,
    },
    expectedOutput: {
      javascript: "Two Sum Results:\nTest 1: [0, 1]\nTest 2: [1, 2]",
      python: "Running Two Sum Solution...\nResult 1: [0, 1]\nResult 2: [1, 2]",
      java: "Processing Two Sum...\nTest 1: [0, 1]\nTest 2: [1, 2]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
}

// Talent IQ Execution
let str = ["H","e","l","l","o"];
reverseString(str);
console.log("Original: ['H','e','l','l','o']");
console.log("Reversed:", str);`,
      python: `# Talent IQ - In-place Reversal
def reverseString(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1

# Demo
test = ["T","a","l","e","n","t"]
reverseString(test)
print("Reversed:", test)`,
      java: `import java.util.*;

public class Main {
    public static void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
    
    public static void main(String[] args) {
        char[] test = {'J','a','v','a'};
        reverseString(test);
        System.out.println("Reversed Result: " + Arrays.toString(test));
    }
}`,
    },
    expectedOutput: {
      javascript: "Original: ['H','e','l','l','o']\nReversed: ['o','l','l','e','H']",
      python: "Reversed: ['t', 'n', 'e', 'l', 'a', 'T']",
      java: "Reversed Result: [a, v, a, J]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.",
      notes: ["Given a string s, return true if it is a palindrome, or false otherwise."],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        input: 's = " "',
        output: "true",
        explanation:
          's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵", "s consists only of printable ASCII characters"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

// Talent IQ Demo
console.log("Checking Palindromes:");
console.log("'race a car' ->", isPalindrome("race a car"));
console.log("'A man, a plan...' ->", isPalindrome("A man, a plan, a canal: Panama"));`,
      python: `import re

def isPalindrome(s):
    # Talent IQ String Processing
    s = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
    return s == s[::-1]

# Demo
print("Palindrome Check:")
print("Level ->", isPalindrome("Level"))
print("Not a Palindrome ->", isPalindrome("Hello"))`,
      java: `public class Main {
    public static boolean isPalindrome(String s) {
        String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        int left = 0, right = clean.length() - 1;
        while (left < right) {
            if (clean.charAt(left) != clean.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println("Status: " + isPalindrome("A man, a plan, a canal: Panama"));
    }
}`,
    },
    expectedOutput: {
      javascript: "Checking Palindromes:\n'race a car' -> false\n'A man, a plan...' -> true",
      python: "Palindrome Check:\nLevel -> True\nNot a Palindrome -> False",
      java: "Status: true",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23.",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// Talent IQ Example
console.log("Max Subarray:", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // Expected: 6`,
      python: `def maxSubArray(nums):
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum

# Demo
print("Maximum Sum:", maxSubArray([5, 4, -1, 7, 8])) # Expected: 23`,
      java: `public class Main {
    public static int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
    
    public static void main(String[] args) {
        System.out.println("Result: " + maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
    }
}`,
    },
    expectedOutput: {
      javascript: "Max Subarray: 6",
      python: "Maximum Sum: 23",
      java: "Result: 6",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: [
        "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container.",
      ],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
      },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: {
      javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxArea = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxArea = Math.max(maxArea, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxArea;
}

// Talent IQ Demo
console.log("Maximum Area:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Expected: 49`,
      python: `def maxArea(height):
    left, right = 0, len(height) - 1
    max_area = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        max_area = max(max_area, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_area

# Run Test
print("Water Captured:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))`,
      java: `public class Main {
    public static int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxArea = 0;
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            maxArea = Math.max(maxArea, area);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxArea;
    }
    
    public static void main(String[] args) {
        System.out.println("Max Water: " + maxArea(new int[]{1,8,6,2,5,4,8,3,7}));
    }
}`,
    },
    expectedOutput: {
      javascript: "Maximum Area: 49",
      python: "Water Captured: 49",
      java: "Max Water: 49",
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};