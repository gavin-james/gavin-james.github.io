import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o,c,a as n,b as t,d as e,f as s}from"./app-5g2Grfu7.js";const l={},u=s('<h1 id="算法思想-回溯算法" tabindex="-1"><a class="header-anchor" href="#算法思想-回溯算法" aria-hidden="true">#</a> 算法思想 - 回溯算法</h1><blockquote><p>Backtracking(回溯)属于 DFS, 本文主要介绍算法中Backtracking算法的思想。回溯算法实际上一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现已不满足求解条件时，就“回溯”返回，尝试别的路径。回溯法是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法</p></blockquote><h2 id="backtracking" tabindex="-1"><a class="header-anchor" href="#backtracking" aria-hidden="true">#</a> Backtracking</h2><ul><li>普通 DFS 主要用在 <strong>可达性问题</strong> ，这种问题只需要执行到特点的位置然后返回即可。</li><li>而 Backtracking 主要用于求解 <strong>排列组合</strong> 问题，例如有 { &#39;a&#39;,&#39;b&#39;,&#39;c&#39; } 三个字符，求解所有由这三个字符排列得到的字符串，这种问题在执行到特定的位置返回之后还会继续执行求解过程。</li></ul><p>因为 Backtracking 不是立即就返回，而要继续求解，因此在程序实现时，需要注意对元素的标记问题:</p><ul><li>在访问一个新元素进入新的递归调用时，需要将新元素标记为已经访问，这样才能在继续递归调用时不用重复访问该元素；</li><li>但是在递归返回时，需要将元素标记为未访问，因为只需要保证在一个递归链中不同时访问一个元素，可以访问已经访问过但是不在当前递归链中的元素。</li></ul><h3 id="数字键盘组合" tabindex="-1"><a class="header-anchor" href="#数字键盘组合" aria-hidden="true">#</a> 数字键盘组合</h3>',7),r={href:"https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/",target:"_blank",rel:"noopener noreferrer"},d=s(`<figure><img src="https://www.pdai.tech/images/pics/a3f34241-bb80-4879-8ec9-dff2d81b514e.jpg" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input:Digit string &quot;23&quot;
Output: [&quot;ad&quot;, &quot;ae&quot;, &quot;af&quot;, &quot;bd&quot;, &quot;be&quot;, &quot;bf&quot;, &quot;cd&quot;, &quot;ce&quot;, &quot;cf&quot;].
private static final String[] KEYS = {&quot;&quot;, &quot;&quot;, &quot;abc&quot;, &quot;def&quot;, &quot;ghi&quot;, &quot;jkl&quot;, &quot;mno&quot;, &quot;pqrs&quot;, &quot;tuv&quot;, &quot;wxyz&quot;};

public List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> letterCombinations(String digits) {
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> combinations = new ArrayList&lt;&gt;();
    if (digits == null || digits.length() == 0) {
        return combinations;
    }
    doCombination(new StringBuilder(), combinations, digits);
    return combinations;
}

private void doCombination(StringBuilder prefix, List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> combinations, final String digits) {
    if (prefix.length() == digits.length()) {
        combinations.add(prefix.toString());
        return;
    }
    int curDigits = digits.charAt(prefix.length()) - &#39;0&#39;;
    String letters = KEYS[curDigits];
    for (char c : letters.toCharArray()) {
        prefix.append(c);                         // 添加
        doCombination(prefix, combinations, digits);
        prefix.deleteCharAt(prefix.length() - 1); // 删除
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ip-地址划分" tabindex="-1"><a class="header-anchor" href="#ip-地址划分" aria-hidden="true">#</a> IP 地址划分</h3>`,3),k={href:"https://leetcode.com/problems/restore-ip-addresses/description/",target:"_blank",rel:"noopener noreferrer"},v=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Given &quot;25525511135&quot;,
return [&quot;255.255.11.135&quot;, &quot;255.255.111.35&quot;].
public List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> restoreIpAddresses(String s) {
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> addresses = new ArrayList&lt;&gt;();
    StringBuilder tempAddress = new StringBuilder();
    doRestore(0, tempAddress, addresses, s);
    return addresses;
}

private void doRestore(int k, StringBuilder tempAddress, List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> addresses, String s) {
    if (k == 4 || s.length() == 0) {
        if (k == 4 &amp;&amp; s.length() == 0) {
            addresses.add(tempAddress.toString());
        }
        return;
    }
    for (int i = 0; i &lt; s.length() &amp;&amp; i &lt;= 2; i++) {
        if (i != 0 &amp;&amp; s.charAt(0) == &#39;0&#39;) {
            break;
        }
        String part = s.substring(0, i + 1);
        if (Integer.valueOf(part) &lt;= 255) {
            if (tempAddress.length() != 0) {
                part = &quot;.&quot; + part;
            }
            tempAddress.append(part);
            doRestore(k + 1, tempAddress, addresses, s.substring(i + 1));
            tempAddress.delete(tempAddress.length() - part.length(), tempAddress.length());
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在矩阵中寻找字符串" tabindex="-1"><a class="header-anchor" href="#在矩阵中寻找字符串" aria-hidden="true">#</a> 在矩阵中寻找字符串</h3>`,2),m={href:"https://leetcode.com/problems/word-search/description/",target:"_blank",rel:"noopener noreferrer"},b=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>For example,
Given board =
[
  [&#39;A&#39;,&#39;B&#39;,&#39;C&#39;,&#39;E&#39;],
  [&#39;S&#39;,&#39;F&#39;,&#39;C&#39;,&#39;S&#39;],
  [&#39;A&#39;,&#39;D&#39;,&#39;E&#39;,&#39;E&#39;]
]
word = &quot;ABCCED&quot;, -&gt; returns true,
word = &quot;SEE&quot;, -&gt; returns true,
word = &quot;ABCB&quot;, -&gt; returns false.
private final static int[][] direction = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
private int m;
private int n;

public boolean exist(char[][] board, String word) {
    if (word == null || word.length() == 0) {
        return true;
    }
    if (board == null || board.length == 0 || board[0].length == 0) {
        return false;
    }

    m = board.length;
    n = board[0].length;
    boolean[][] hasVisited = new boolean[m][n];

    for (int r = 0; r &lt; m; r++) {
        for (int c = 0; c &lt; n; c++) {
            if (backtracking(0, r, c, hasVisited, board, word)) {
                return true;
            }
        }
    }

    return false;
}

private boolean backtracking(int curLen, int r, int c, boolean[][] visited, final char[][] board, final String word) {
    if (curLen == word.length()) {
        return true;
    }
    if (r &lt; 0 || r &gt;= m || c &lt; 0 || c &gt;= n
            || board[r][c] != word.charAt(curLen) || visited[r][c]) {

        return false;
    }

    visited[r][c] = true;

    for (int[] d : direction) {
        if (backtracking(curLen + 1, r + d[0], c + d[1], visited, board, word)) {
            return true;
        }
    }

    visited[r][c] = false;

    return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="输出二叉树中所有从根到叶子的路径" tabindex="-1"><a class="header-anchor" href="#输出二叉树中所有从根到叶子的路径" aria-hidden="true">#</a> 输出二叉树中所有从根到叶子的路径</h3>`,2),g={href:"https://leetcode.com/problems/binary-tree-paths/description/",target:"_blank",rel:"noopener noreferrer"},h=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>  1
 /  \\
2    3
 \\
  5
[&quot;1-&gt;2-&gt;5&quot;, &quot;1-&gt;3&quot;]
public List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> binaryTreePaths(TreeNode root) {
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> paths = new ArrayList&lt;&gt;();
    if (root == null) {
        return paths;
    }
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> values = new ArrayList&lt;&gt;();
    backtracking(root, values, paths);
    return paths;
}

private void backtracking(TreeNode node, List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> values, List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> paths) {
    if (node == null) {
        return;
    }
    values.add(node.val);
    if (isLeaf(node)) {
        paths.add(buildPath(values));
    } else {
        backtracking(node.left, values, paths);
        backtracking(node.right, values, paths);
    }
    values.remove(values.size() - 1);
}

private boolean isLeaf(TreeNode node) {
    return node.left == null &amp;&amp; node.right == null;
}

private String buildPath(List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> values) {
    StringBuilder str = new StringBuilder();
    for (int i = 0; i &lt; values.size(); i++) {
        str.append(values.get(i));
        if (i != values.size() - 1) {
            str.append(&quot;-&gt;&quot;);
        }
    }
    return str.toString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排列" tabindex="-1"><a class="header-anchor" href="#排列" aria-hidden="true">#</a> 排列</h3>`,2),w={href:"https://leetcode.com/problems/permutations/description/",target:"_blank",rel:"noopener noreferrer"},f=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>[1,2,3] have the following permutations:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
public List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; permute(int[] nums) {
    List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; permutes = new ArrayList&lt;&gt;();
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> permuteList = new ArrayList&lt;&gt;();
    boolean[] hasVisited = new boolean[nums.length];
    backtracking(permuteList, permutes, hasVisited, nums);
    return permutes;
}

private void backtracking(List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> permuteList, List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; permutes, boolean[] visited, final int[] nums) {
    if (permuteList.size() == nums.length) {
        permutes.add(new ArrayList&lt;&gt;(permuteList)); // 重新构造一个 List
        return;
    }
    for (int i = 0; i &lt; visited.length; i++) {
        if (visited[i]) {
            continue;
        }
        visited[i] = true;
        permuteList.add(nums[i]);
        backtracking(permuteList, permutes, visited, nums);
        permuteList.remove(permuteList.size() - 1);
        visited[i] = false;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="含有相同元素求排列" tabindex="-1"><a class="header-anchor" href="#含有相同元素求排列" aria-hidden="true">#</a> 含有相同元素求排列</h3>`,2),y={href:"https://leetcode.com/problems/permutations-ii/description/",target:"_blank",rel:"noopener noreferrer"},L=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>[1,1,2] have the following unique permutations:
[[1,1,2], [1,2,1], [2,1,1]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>数组元素可能含有相同的元素，进行排列时就有可能出现重复的排列，要求重复的排列只返回一个。</p><p>在实现上，和 Permutations 不同的是要先排序，然后在添加一个元素时，判断这个元素是否等于前一个元素，如果等于，并且前一个元素还未访问，那么就跳过这个元素。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">permuteUnique</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> permutes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> permuteList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>nums<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 排序</span>
    <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> hasVisited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">backtracking</span><span class="token punctuation">(</span>permuteList<span class="token punctuation">,</span> permutes<span class="token punctuation">,</span> hasVisited<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> permutes<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> permuteList<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> permutes<span class="token punctuation">,</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> visited<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>permuteList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        permutes<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>permuteList<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> visited<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>visited<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>  <span class="token comment">// 防止重复</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>visited<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        visited<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        permuteList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">backtracking</span><span class="token punctuation">(</span>permuteList<span class="token punctuation">,</span> permutes<span class="token punctuation">,</span> visited<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
        permuteList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>permuteList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        visited<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合" tabindex="-1"><a class="header-anchor" href="#组合" aria-hidden="true">#</a> 组合</h3>`,5),_={href:"https://leetcode.com/problems/combinations/description/",target:"_blank",rel:"noopener noreferrer"},S=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>If n = 4 and k = 2, a solution is:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
public List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combine(int n, int k) {
    List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinations = new ArrayList&lt;&gt;();
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> combineList = new ArrayList&lt;&gt;();
    backtracking(combineList, combinations, 1, k, n);
    return combinations;
}

private void backtracking(List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> combineList, List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinations, int start, int k, final int n) {
    if (k == 0) {
        combinations.add(new ArrayList&lt;&gt;(combineList));
        return;
    }
    for (int i = start; i &lt;= n - k + 1; i++) {  // 剪枝
        combineList.add(i);
        backtracking(combineList, combinations, i + 1, k - 1, n);
        combineList.remove(combineList.size() - 1);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合求和" tabindex="-1"><a class="header-anchor" href="#组合求和" aria-hidden="true">#</a> 组合求和</h3>`,2),q={href:"https://leetcode.com/problems/combination-sum/description/",target:"_blank",rel:"noopener noreferrer"},I=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>given candidate set [2, 3, 6, 7] and target 7,
A solution set is:
[[7],[2, 2, 3]]
public List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinationSum(int[] candidates, int target) {
    List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinations = new ArrayList&lt;&gt;();
    backtracking(new ArrayList&lt;&gt;(), combinations, 0, target, candidates);
    return combinations;
}

private void backtracking(List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> tempCombination, List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinations,
                          int start, int target, final int[] candidates) {

    if (target == 0) {
        combinations.add(new ArrayList&lt;&gt;(tempCombination));
        return;
    }
    for (int i = start; i &lt; candidates.length; i++) {
        if (candidates[i] &lt;= target) {
            tempCombination.add(candidates[i]);
            backtracking(tempCombination, combinations, i, target - candidates[i], candidates);
            tempCombination.remove(tempCombination.size() - 1);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="含有相同元素的求组合求和" tabindex="-1"><a class="header-anchor" href="#含有相同元素的求组合求和" aria-hidden="true">#</a> 含有相同元素的求组合求和</h3>`,2),x={href:"https://leetcode.com/problems/combination-sum-ii/description/",target:"_blank",rel:"noopener noreferrer"},A=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>For example, given candidate set [10, 1, 2, 7, 6, 1, 5] and target 8,
A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
public List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinationSum2(int[] candidates, int target) {
    List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinations = new ArrayList&lt;&gt;();
    Arrays.sort(candidates);
    backtracking(new ArrayList&lt;&gt;(), combinations, new boolean[candidates.length], 0, target, candidates);
    return combinations;
}

private void backtracking(List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> tempCombination, List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; combinations,
                          boolean[] hasVisited, int start, int target, final int[] candidates) {

    if (target == 0) {
        combinations.add(new ArrayList&lt;&gt;(tempCombination));
        return;
    }
    for (int i = start; i &lt; candidates.length; i++) {
        if (i != 0 &amp;&amp; candidates[i] == candidates[i - 1] &amp;&amp; !hasVisited[i - 1]) {
            continue;
        }
        if (candidates[i] &lt;= target) {
            tempCombination.add(candidates[i]);
            hasVisited[i] = true;
            backtracking(tempCombination, combinations, hasVisited, i + 1, target - candidates[i], candidates);
            hasVisited[i] = false;
            tempCombination.remove(tempCombination.size() - 1);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-9-数字的组合求和" tabindex="-1"><a class="header-anchor" href="#_1-9-数字的组合求和" aria-hidden="true">#</a> 1-9 数字的组合求和</h3>`,2),z={href:"https://leetcode.com/problems/combination-sum-iii/description/",target:"_blank",rel:"noopener noreferrer"},C=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>Input: k = 3, n = 9

Output:

[[1,2,6], [1,3,5], [2,3,4]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 1-9 数字中选出 k 个数不重复的数，使得它们的和为 n。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">combinationSum3</span><span class="token punctuation">(</span><span class="token keyword">int</span> k<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> combinations <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> path <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">backtracking</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> n<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> combinations<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> combinations<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token keyword">int</span> k<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span> start<span class="token punctuation">,</span>
                          <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> tempCombination<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> combinations<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        combinations<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>tempCombination<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">9</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        tempCombination<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">backtracking</span><span class="token punctuation">(</span>k <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> n <span class="token operator">-</span> i<span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> tempCombination<span class="token punctuation">,</span> combinations<span class="token punctuation">)</span><span class="token punctuation">;</span>
        tempCombination<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>tempCombination<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子集" tabindex="-1"><a class="header-anchor" href="#子集" aria-hidden="true">#</a> 子集</h3>`,4),j={href:"https://leetcode.com/problems/subsets/description/",target:"_blank",rel:"noopener noreferrer"},U=s(`<p>找出集合的所有子集，子集不能重复，[1, 2] 和 [2, 1] 这种子集算重复</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">subsets</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> subsets <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> tempSubset <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> size <span class="token operator">&lt;=</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> size<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> tempSubset<span class="token punctuation">,</span> subsets<span class="token punctuation">,</span> size<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不同的子集大小</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> subsets<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token keyword">int</span> start<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> tempSubset<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> subsets<span class="token punctuation">,</span>
                          <span class="token keyword">final</span> <span class="token keyword">int</span> size<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>tempSubset<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        subsets<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>tempSubset<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> start<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        tempSubset<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">backtracking</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> tempSubset<span class="token punctuation">,</span> subsets<span class="token punctuation">,</span> size<span class="token punctuation">,</span> nums<span class="token punctuation">)</span><span class="token punctuation">;</span>
        tempSubset<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>tempSubset<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="含有相同元素求子集" tabindex="-1"><a class="header-anchor" href="#含有相同元素求子集" aria-hidden="true">#</a> 含有相同元素求子集</h3>`,3),P={href:"https://leetcode.com/problems/subsets-ii/description/",target:"_blank",rel:"noopener noreferrer"},V=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>For example,
If nums = [1,2,2], a solution is:

[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
public List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; subsets = new ArrayList&lt;&gt;();
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> tempSubset = new ArrayList&lt;&gt;();
    boolean[] hasVisited = new boolean[nums.length];
    for (int size = 0; size &lt;= nums.length; size++) {
        backtracking(0, tempSubset, subsets, hasVisited, size, nums); // 不同的子集大小
    }
    return subsets;
}

private void backtracking(int start, List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span> tempSubset, List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Integer</span><span class="token punctuation">&gt;</span></span>&gt; subsets, boolean[] hasVisited,
                          final int size, final int[] nums) {

    if (tempSubset.size() == size) {
        subsets.add(new ArrayList&lt;&gt;(tempSubset));
        return;
    }
    for (int i = start; i &lt; nums.length; i++) {
        if (i != 0 &amp;&amp; nums[i] == nums[i - 1] &amp;&amp; !hasVisited[i - 1]) {
            continue;
        }
        tempSubset.add(nums[i]);
        hasVisited[i] = true;
        backtracking(i + 1, tempSubset, subsets, hasVisited, size, nums);
        hasVisited[i] = false;
        tempSubset.remove(tempSubset.size() - 1);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分割字符串使得每个部分都是回文数" tabindex="-1"><a class="header-anchor" href="#分割字符串使得每个部分都是回文数" aria-hidden="true">#</a> 分割字符串使得每个部分都是回文数</h3>`,2),B={href:"https://leetcode.com/problems/palindrome-partitioning/description/",target:"_blank",rel:"noopener noreferrer"},N=s(`<div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>For example, given s = &quot;aab&quot;,
Return

[
  [&quot;aa&quot;,&quot;b&quot;],
  [&quot;a&quot;,&quot;a&quot;,&quot;b&quot;]
]
public List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span>&gt; partition(String s) {
    List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span>&gt; partitions = new ArrayList&lt;&gt;();
    List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> tempPartition = new ArrayList&lt;&gt;();
    doPartition(s, partitions, tempPartition);
    return partitions;
}

private void doPartition(String s, List&lt;List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span>&gt; partitions, List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String</span><span class="token punctuation">&gt;</span></span> tempPartition) {
    if (s.length() == 0) {
        partitions.add(new ArrayList&lt;&gt;(tempPartition));
        return;
    }
    for (int i = 0; i &lt; s.length(); i++) {
        if (isPalindrome(s, 0, i)) {
            tempPartition.add(s.substring(0, i + 1));
            doPartition(s.substring(i + 1), partitions, tempPartition);
            tempPartition.remove(tempPartition.size() - 1);
        }
    }
}

private boolean isPalindrome(String s, int begin, int end) {
    while (begin &lt; end) {
        if (s.charAt(begin++) != s.charAt(end--)) {
            return false;
        }
    }
    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数独" tabindex="-1"><a class="header-anchor" href="#数独" aria-hidden="true">#</a> 数独</h3>`,2),E={href:"https://leetcode.com/problems/sudoku-solver/description/",target:"_blank",rel:"noopener noreferrer"},M=s(`<figure><img src="https://www.pdai.tech/images/pics/1ca52246-c443-48ae-b1f8-1cafc09ec75c.png" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> rowsUsed <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> colsUsed <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cubesUsed <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> board<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">solveSudoku</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> board<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>board <span class="token operator">=</span> board<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">9</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">9</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>board<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">&#39;.&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">int</span> num <span class="token operator">=</span> board<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">;</span>
            rowsUsed<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            colsUsed<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            cubesUsed<span class="token punctuation">[</span><span class="token function">cubeNum</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">9</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">9</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">backtracking</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token keyword">int</span> row<span class="token punctuation">,</span> <span class="token keyword">int</span> col<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>row <span class="token operator">&lt;</span> <span class="token number">9</span> <span class="token operator">&amp;&amp;</span> board<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">&#39;.&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        row <span class="token operator">=</span> col <span class="token operator">==</span> <span class="token number">8</span> <span class="token operator">?</span> row <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">:</span> row<span class="token punctuation">;</span>
        col <span class="token operator">=</span> col <span class="token operator">==</span> <span class="token number">8</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> col <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>row <span class="token operator">==</span> <span class="token number">9</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> num <span class="token operator">&lt;=</span> <span class="token number">9</span><span class="token punctuation">;</span> num<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rowsUsed<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">||</span> colsUsed<span class="token punctuation">[</span>col<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">||</span> cubesUsed<span class="token punctuation">[</span><span class="token function">cubeNum</span><span class="token punctuation">(</span>row<span class="token punctuation">,</span> col<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        rowsUsed<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> colsUsed<span class="token punctuation">[</span>col<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> cubesUsed<span class="token punctuation">[</span><span class="token function">cubeNum</span><span class="token punctuation">(</span>row<span class="token punctuation">,</span> col<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        board<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>num <span class="token operator">+</span> <span class="token char">&#39;0&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">backtracking</span><span class="token punctuation">(</span>row<span class="token punctuation">,</span> col<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        board<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;.&#39;</span><span class="token punctuation">;</span>
        rowsUsed<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> colsUsed<span class="token punctuation">[</span>col<span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> cubesUsed<span class="token punctuation">[</span><span class="token function">cubeNum</span><span class="token punctuation">(</span>row<span class="token punctuation">,</span> col<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">[</span>num<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">cubeNum</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> r <span class="token operator">=</span> i <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> j <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> r <span class="token operator">*</span> <span class="token number">3</span> <span class="token operator">+</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="n-皇后" tabindex="-1"><a class="header-anchor" href="#n-皇后" aria-hidden="true">#</a> N 皇后</h3>`,3),Q={href:"https://leetcode.com/problems/n-queens/description/",target:"_blank",rel:"noopener noreferrer"},D=s(`<figure><img src="https://www.pdai.tech/images/pics/1f080e53-4758-406c-bb5f-dbedf89b63ce.jpg" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><p>在 n*n 的矩阵中摆放 n 个皇后，并且每个皇后不能在同一行，同一列，同一对角线上，求所有的 n 皇后的解。</p><p>一行一行地摆放，在确定一行中的那个皇后应该摆在哪一列时，需要用三个标记数组来确定某一列是否合法，这三个标记数组分别为: 列标记数组、45 度对角线标记数组和 135 度对角线标记数组。</p><p>45 度对角线标记数组的维度为 2 * n - 1，通过下图可以明确 (r, c) 的位置所在的数组下标为 r + c。</p><figure><img src="https://www.pdai.tech/images/pics/85583359-1b45-45f2-9811-4f7bb9a64db7.jpg" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><p>135 度对角线标记数组的维度也是 2 * n - 1，(r, c) 的位置所在的数组下标为 n - 1 - (r - c)。</p><figure><img src="https://www.pdai.tech/images/pics/9e80f75a-b12b-4344-80c8-1f9ccc2d5246.jpg" alt="image" tabindex="0" loading="lazy"><figcaption>image</figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> solutions<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nQueens<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> colUsed<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> diagonals45Used<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> diagonals135Used<span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> n<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">solveNQueens</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    solutions <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    nQueens <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span>nQueens<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token char">&#39;.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    colUsed <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
    diagonals45Used <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    diagonals135Used <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>n <span class="token operator">=</span> n<span class="token punctuation">;</span>
    <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> solutions<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">backtracking</span><span class="token punctuation">(</span><span class="token keyword">int</span> row<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>row <span class="token operator">==</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">:</span> nQueens<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>chars<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        solutions<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> col <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> col <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> col<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> diagonals45Idx <span class="token operator">=</span> row <span class="token operator">+</span> col<span class="token punctuation">;</span>
        <span class="token keyword">int</span> diagonals135Idx <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> <span class="token punctuation">(</span>row <span class="token operator">-</span> col<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>colUsed<span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">||</span> diagonals45Used<span class="token punctuation">[</span>diagonals45Idx<span class="token punctuation">]</span> <span class="token operator">||</span> diagonals135Used<span class="token punctuation">[</span>diagonals135Idx<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">continue</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        nQueens<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;Q&#39;</span><span class="token punctuation">;</span>
        colUsed<span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> diagonals45Used<span class="token punctuation">[</span>diagonals45Idx<span class="token punctuation">]</span> <span class="token operator">=</span> diagonals135Used<span class="token punctuation">[</span>diagonals135Idx<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token function">backtracking</span><span class="token punctuation">(</span>row <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        colUsed<span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> diagonals45Used<span class="token punctuation">[</span>diagonals45Idx<span class="token punctuation">]</span> <span class="token operator">=</span> diagonals135Used<span class="token punctuation">[</span>diagonals135Idx<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        nQueens<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">&#39;.&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function F(T,R){const a=i("ExternalLinkIcon");return o(),c("div",null,[u,n("p",null,[n("a",r,[t("17. Letter Combinations of a Phone Number (Medium)在新窗口打开"),e(a)])]),d,n("p",null,[n("a",k,[t("93. Restore IP Addresses(Medium)在新窗口打开"),e(a)])]),v,n("p",null,[n("a",m,[t("79. Word Search (Medium)在新窗口打开"),e(a)])]),b,n("p",null,[n("a",g,[t("257. Binary Tree Paths (Easy)在新窗口打开"),e(a)])]),h,n("p",null,[n("a",w,[t("46. Permutations (Medium)在新窗口打开"),e(a)])]),f,n("p",null,[n("a",y,[t("47. Permutations II (Medium)在新窗口打开"),e(a)])]),L,n("p",null,[n("a",_,[t("77. Combinations (Medium)在新窗口打开"),e(a)])]),S,n("p",null,[n("a",q,[t("39. Combination Sum (Medium)在新窗口打开"),e(a)])]),I,n("p",null,[n("a",x,[t("40. Combination Sum II (Medium)在新窗口打开"),e(a)])]),A,n("p",null,[n("a",z,[t("216. Combination Sum III (Medium)在新窗口打开"),e(a)])]),C,n("p",null,[n("a",j,[t("78. Subsets (Medium)在新窗口打开"),e(a)])]),U,n("p",null,[n("a",P,[t("90. Subsets II (Medium)在新窗口打开"),e(a)])]),V,n("p",null,[n("a",B,[t("131. Palindrome Partitioning (Medium)在新窗口打开"),e(a)])]),N,n("p",null,[n("a",E,[t("37. Sudoku Solver (Hard)在新窗口打开"),e(a)])]),M,n("p",null,[n("a",Q,[t("51. N-Queens (Hard)在新窗口打开"),e(a)])]),D])}const H=p(l,[["render",F],["__file","alg-core-backtracking.html.vue"]]);export{H as default};
