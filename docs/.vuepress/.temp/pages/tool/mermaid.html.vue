<template><div><h1 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图" aria-hidden="true">#</a> 流程图</h1>
<h3 id="默认节点" tabindex="-1"><a class="header-anchor" href="#默认节点" aria-hidden="true">#</a> 默认节点</h3>
<Mermaid id="mermaid-6" code="eJxLy8kvT85ILCpR8AniUgCCzBQuAEjsBeo="></Mermaid><blockquote>
<p>注意 id 是框中显示的内容。</p>
</blockquote>
<h3 id="文本框节点" tabindex="-1"><a class="header-anchor" href="#文本框节点" aria-hidden="true">#</a> 文本框节点</h3>
<p>也可以在不同于 id 的框中设置文本。 如果多次这样做，它将是为将使用的节点找到的最后一个文本。 此外，如果您稍后为节点定义边，则可以省略文本定义。 渲染框时将使用先前定义的那个。</p>
<Mermaid id="mermaid-18" code="eJxLy8kvT85ILCpR8AniUgCCzBTD6JCMzGIFICrJSFUoSa0oUcjMA7OT8itiuQCjchBu"></Mermaid><h2 id="图形" tabindex="-1"><a class="header-anchor" href="#图形" aria-hidden="true">#</a> 图形</h2>
<p>This statement declares the direction of the Flowchart.</p>
<p>This declares the flowchart is oriented from top to bottom (<code v-pre>TD</code> or <code v-pre>TB</code>).</p>
<Mermaid id="mermaid-28" code="eJxLy8kvT85ILCpRCHHhUgCC4BIQR1fXDsjKL+ACAKoYCaM="></Mermaid><p>This declares the flowchart is oriented from left to right (<code v-pre>LR</code>).</p>
<Mermaid id="mermaid-32" code="eJxLy8kvT85ILCpR8AniUgCC4BIQR1fXDsjKL+ACAKqOCak="></Mermaid><h2 id="flowchart-orientation" tabindex="-1"><a class="header-anchor" href="#flowchart-orientation" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=flowchart-orientation" target="_blank" rel="noopener noreferrer">Flowchart Orientation<ExternalLinkIcon/></a></h2>
<p>Possible FlowChart orientations are:</p>
<ul>
<li>TB - top to bottom</li>
<li>TD - top-down/ same as top to bottom</li>
<li>BT - bottom to top</li>
<li>RL - right to left</li>
<li>LR - left to right</li>
</ul>
<h2 id="node-shapes" tabindex="-1"><a class="header-anchor" href="#node-shapes" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=node-shapes" target="_blank" rel="noopener noreferrer">Node shapes<ExternalLinkIcon/></a></h2>
<h3 id="a-node-with-round-edges" tabindex="-1"><a class="header-anchor" href="#a-node-with-round-edges" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-with-round-edges" target="_blank" rel="noopener noreferrer">A node with round edges<ExternalLinkIcon/></a></h3>
<Mermaid id="mermaid-72" code="eJxLy8kvT85ILCpR8AniUgCCzBRDjZCMzGIFICrJSFUoSa0oUcjMA7OT8is0uQCdEBAH"></Mermaid><h3 id="a-stadium-shaped-node" tabindex="-1"><a class="header-anchor" href="#a-stadium-shaped-node" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-stadium-shaped-node" target="_blank" rel="noopener noreferrer">A stadium-shaped node<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1([This is the text in the box])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the box</p>
<h3 id="a-node-in-a-subroutine-shape" tabindex="-1"><a class="header-anchor" href="#a-node-in-a-subroutine-shape" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-a-subroutine-shape" target="_blank" rel="noopener noreferrer">A node in a subroutine shape<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1[[This is the text in the box]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the box</p>
<h3 id="a-node-in-a-cylindrical-shape" tabindex="-1"><a class="header-anchor" href="#a-node-in-a-cylindrical-shape" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-a-cylindrical-shape" target="_blank" rel="noopener noreferrer">A node in a cylindrical shape<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1[(Database)]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Database</p>
<h3 id="a-node-in-the-form-of-a-circle" tabindex="-1"><a class="header-anchor" href="#a-node-in-the-form-of-a-circle" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-the-form-of-a-circle" target="_blank" rel="noopener noreferrer">A node in the form of a circle<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1((This is the text in the circle))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the circle</p>
<h3 id="a-node-in-an-asymmetric-shape" tabindex="-1"><a class="header-anchor" href="#a-node-in-an-asymmetric-shape" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-an-asymmetric-shape" target="_blank" rel="noopener noreferrer">A node in an asymmetric shape<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1>This is the text in the box]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the box</p>
<p>Currently only the shape above is possible and not its mirror. <em>This might change with future releases.</em></p>
<h3 id="a-node-rhombus" tabindex="-1"><a class="header-anchor" href="#a-node-rhombus" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-rhombus" target="_blank" rel="noopener noreferrer">A node (rhombus)<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1{This is the text in the box}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the box</p>
<h3 id="a-hexagon-node" tabindex="-1"><a class="header-anchor" href="#a-hexagon-node" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-hexagon-node" target="_blank" rel="noopener noreferrer">A hexagon node<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1{{This is the text in the box}}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the box</p>
<h3 id="parallelogram" tabindex="-1"><a class="header-anchor" href="#parallelogram" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=parallelogram" target="_blank" rel="noopener noreferrer">Parallelogram<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    id1[/This is the text in the box/]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the box</p>
<h3 id="parallelogram-alt" tabindex="-1"><a class="header-anchor" href="#parallelogram-alt" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=parallelogram-alt" target="_blank" rel="noopener noreferrer">Parallelogram alt<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    id1[\This is the text in the box\]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the box</p>
<h3 id="trapezoid" tabindex="-1"><a class="header-anchor" href="#trapezoid" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=trapezoid" target="_blank" rel="noopener noreferrer">Trapezoid<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    A[/Christmas\]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Christmas</p>
<h3 id="trapezoid-alt" tabindex="-1"><a class="header-anchor" href="#trapezoid-alt" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=trapezoid-alt" target="_blank" rel="noopener noreferrer">Trapezoid alt<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    B[\Go shopping/]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Go shopping</p>
<h3 id="double-circle" tabindex="-1"><a class="header-anchor" href="#double-circle" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=double-circle" target="_blank" rel="noopener noreferrer">Double circle<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    id1(((This is the text in the circle)))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text in the circle</p>
<h2 id="links-between-nodes" tabindex="-1"><a class="header-anchor" href="#links-between-nodes" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=links-between-nodes" target="_blank" rel="noopener noreferrer">Links between nodes<ExternalLinkIcon/></a></h2>
<p>Nodes can be connected with links/edges. It is possible to have different types of links or attach a text string to a link.</p>
<h3 id="a-link-with-arrow-head" tabindex="-1"><a class="header-anchor" href="#a-link-with-arrow-head" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-link-with-arrow-head" target="_blank" rel="noopener noreferrer">A link with arrow head<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A-->B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>AB</p>
<h3 id="an-open-link" tabindex="-1"><a class="header-anchor" href="#an-open-link" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=an-open-link" target="_blank" rel="noopener noreferrer">An open link<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A --- B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>AB</p>
<h3 id="text-on-links" tabindex="-1"><a class="header-anchor" href="#text-on-links" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=text-on-links" target="_blank" rel="noopener noreferrer">Text on links<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A-- This is the text! ---B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the text!AB</p>
<p>or</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A---|This is the text|B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the textAB</p>
<h3 id="a-link-with-arrow-head-and-text" tabindex="-1"><a class="header-anchor" href="#a-link-with-arrow-head-and-text" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=a-link-with-arrow-head-and-text" target="_blank" rel="noopener noreferrer">A link with arrow head and text<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A-->|text|B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>textAB</p>
<p>or</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A-- text -->B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>textAB</p>
<h3 id="dotted-link" tabindex="-1"><a class="header-anchor" href="#dotted-link" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=dotted-link" target="_blank" rel="noopener noreferrer">Dotted link<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR;
   A-.->B;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>AB</p>
<h3 id="dotted-link-with-text" tabindex="-1"><a class="header-anchor" href="#dotted-link-with-text" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=dotted-link-with-text" target="_blank" rel="noopener noreferrer">Dotted link with text<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
   A-. text .-> B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>textAB</p>
<h3 id="thick-link" tabindex="-1"><a class="header-anchor" href="#thick-link" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=thick-link" target="_blank" rel="noopener noreferrer">Thick link<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
   A ==> B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>AB</p>
<h3 id="thick-link-with-text" tabindex="-1"><a class="header-anchor" href="#thick-link-with-text" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=thick-link-with-text" target="_blank" rel="noopener noreferrer">Thick link with text<ExternalLinkIcon/></a></h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
   A == text ==> B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>textAB</p>
<h3 id="chaining-of-links" tabindex="-1"><a class="header-anchor" href="#chaining-of-links" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=chaining-of-links" target="_blank" rel="noopener noreferrer">Chaining of links<ExternalLinkIcon/></a></h3>
<p>It is possible declare many links in the same line as per below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
   A -- text --> B -- text2 --> C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>texttext2ABC</p>
<p>It is also possible to declare multiple nodes links in the same line as per below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
   a --> b &amp; c--> d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>abcd</p>
<p>You can then describe dependencies in a very expressive way. Like the one-liner below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TB
    A &amp; B--> C &amp; D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ABCD</p>
<p>If you describe the same diagram using the the basic syntax, it will take four lines. A word of warning, one could go overboard with this making the flowchart harder to read in markdown form. The Swedish word <code v-pre>lagom</code> comes to mind. It means, not too much and not too little. This goes for expressive syntaxes as well.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TB
    A --> C
    A --> D
    B --> C
    B --> D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-arrow-types" tabindex="-1"><a class="header-anchor" href="#new-arrow-types" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=new-arrow-types" target="_blank" rel="noopener noreferrer">New arrow types<ExternalLinkIcon/></a></h3>
<p>There are new types of arrows supported as per below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A --o B
    B --x C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ABC</p>
<h3 id="multi-directional-arrows" tabindex="-1"><a class="header-anchor" href="#multi-directional-arrows" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=multi-directional-arrows" target="_blank" rel="noopener noreferrer">Multi directional arrows<ExternalLinkIcon/></a></h3>
<p>There is the possibility to use multidirectional arrows.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A o--o B
    B &lt;--> C
    C x--x D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ABCD</p>
<h3 id="minimum-length-of-a-link" tabindex="-1"><a class="header-anchor" href="#minimum-length-of-a-link" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=minimum-length-of-a-link" target="_blank" rel="noopener noreferrer">Minimum length of a link<ExternalLinkIcon/></a></h3>
<p>Each node in the flowchart is ultimately assigned to a rank in the rendered graph, i.e. to a vertical or horizontal level (depending on the flowchart orientation), based on the nodes to which it is linked. By default, links can span any number of ranks, but you can ask for any link to be longer than the others by adding extra dashes in the link definition.</p>
<p>In the following example, two extra dashes are added in the link from node <em>B</em> to node <em>E</em>, so that it spans two more ranks than regular links:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YesNoStartIs it?OKRethinkEnd</p>
<blockquote>
<p><strong>Note</strong> Links may still be made longer than the requested number of ranks by the rendering engine to accommodate other requests.</p>
</blockquote>
<p>When the link label is written in the middle of the link, the extra dashes must be added on the right side of the link. The following example is equivalent to the previous one:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>YesNoStartIs it?OKRethinkEnd</p>
<p>For dotted or thick links, the characters to add are equals signs or dots, as summed up in the following table:</p>
<table>
<thead>
<tr>
<th>Length</th>
<th>1</th>
<th>2</th>
<th>3</th>
</tr>
</thead>
<tbody>
<tr>
<td>Normal</td>
<td><code v-pre>---</code></td>
<td><code v-pre>----</code></td>
<td><code v-pre>-----</code></td>
</tr>
<tr>
<td>Normal with arrow</td>
<td><code v-pre>--&gt;</code></td>
<td><code v-pre>---&gt;</code></td>
<td><code v-pre>----&gt;</code></td>
</tr>
<tr>
<td>Thick</td>
<td><code v-pre>===</code></td>
<td><code v-pre>====</code></td>
<td><code v-pre>=====</code></td>
</tr>
<tr>
<td>Thick with arrow</td>
<td><code v-pre>==&gt;</code></td>
<td><code v-pre>===&gt;</code></td>
<td><code v-pre>====&gt;</code></td>
</tr>
<tr>
<td>Dotted</td>
<td><code v-pre>-.-</code></td>
<td><code v-pre>-..-</code></td>
<td><code v-pre>-...-</code></td>
</tr>
<tr>
<td>Dotted with arrow</td>
<td><code v-pre>-.-&gt;</code></td>
<td><code v-pre>-..-&gt;</code></td>
<td><code v-pre>-...-&gt;</code></td>
</tr>
</tbody>
</table>
<h2 id="special-characters-that-break-syntax" tabindex="-1"><a class="header-anchor" href="#special-characters-that-break-syntax" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=special-characters-that-break-syntax" target="_blank" rel="noopener noreferrer">Special characters that break syntax<ExternalLinkIcon/></a></h2>
<p>It is possible to put text within quotes in order to render more troublesome characters. As in the example below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1["This is the (text) in the box"]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the (text) in the box</p>
<h3 id="entity-codes-to-escape-characters" tabindex="-1"><a class="header-anchor" href="#entity-codes-to-escape-characters" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=entity-codes-to-escape-characters" target="_blank" rel="noopener noreferrer">Entity codes to escape characters<ExternalLinkIcon/></a></h3>
<p>It is possible to escape characters using the syntax exemplified here.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    flowchart LR
        A["A double quote:#quot;"] -->B["A dec char:#9829;"]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>A double quote:&quot;A dec char:♥</p>
<p>Numbers given are base 10, so <code v-pre>#</code> can be encoded as <code v-pre>#35;</code>. It is also supported to use HTML character names.</p>
<h2 id="subgraphs" tabindex="-1"><a class="header-anchor" href="#subgraphs" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=subgraphs" target="_blank" rel="noopener noreferrer">Subgraphs<ExternalLinkIcon/></a></h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>subgraph title
    graph definition
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>An example below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>threeonec2c1twob2b1a2a1</p>
<p>You can also set an explicit id for the subgraph.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TB
    c1-->a2
    subgraph ide1 [one]
    a1-->a2
    end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>onea2a1c1</p>
<h2 id="flowcharts" tabindex="-1"><a class="header-anchor" href="#flowcharts" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=flowcharts" target="_blank" rel="noopener noreferrer">flowcharts<ExternalLinkIcon/></a></h2>
<p>With the graphtype flowchart it is also possible to set edges to and from subgraphs as in the flowchart below.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>threeonec2c1twob2b1a2a1</p>
<h2 id="direction-in-subgraphs" tabindex="-1"><a class="header-anchor" href="#direction-in-subgraphs" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=direction-in-subgraphs" target="_blank" rel="noopener noreferrer">Direction in subgraphs<ExternalLinkIcon/></a></h2>
<p>With the graphtype flowcharts you can use the direction statement to set the direction which the subgraph will render like in this example.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
  subgraph TOP
    direction TB
    subgraph B1
        direction RL
        i1 -->f1
    end
    subgraph B2
        direction BT
        i2 -->f2
    end
  end
  A --> TOP --> B
  B1 --> B2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TOPB1f1i1B2f2i2AB</p>
<h2 id="interaction" tabindex="-1"><a class="header-anchor" href="#interaction" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=interaction" target="_blank" rel="noopener noreferrer">Interaction<ExternalLinkIcon/></a></h2>
<p>It is possible to bind a click event to a node, the click can lead to either a javascript callback or to a link which will be opened in a new browser tab. <strong>Note</strong>: This functionality is disabled when using <code v-pre>securityLevel='strict'</code> and enabled when using <code v-pre>securityLevel='loose'</code>.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>click nodeId callback
click nodeId call callback()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>nodeId is the id of the node</li>
<li>callback is the name of a javascript function defined on the page displaying the graph, the function will be called with the nodeId as parameter.</li>
</ul>
<p>Examples of tooltip usage below:</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">var</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'A callback was triggered'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The tooltip text is surrounded in double quotes. The styles of the tooltip are set by the class <code v-pre>.mermaidTooltip</code>.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A-->B
    B-->C
    C-->D
    click A callback "Tooltip for a callback"
    click B "https://www.github.com" "This is a tooltip for a link"
    click A call callback() "Tooltip for a callback"
    click B href "https://www.github.com" "This is a tooltip for a link"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ABCD</p>
<blockquote>
<p><strong>Success</strong> The tooltip functionality and the ability to link to urls are available from version 0.5.2.</p>
</blockquote>
<p>Due to limitations with how Docsify handles JavaScript callback functions, an alternate working demo for the above code can be viewed at <a href="https://jsfiddle.net/s37cjoau/3/" target="_blank" rel="noopener noreferrer">this jsfiddle<ExternalLinkIcon/></a>.</p>
<p>Links are opened in the same browser tab/window by default. It is possible to change this by adding a link target to the click definition (<code v-pre>_self</code>, <code v-pre>_blank</code>, <code v-pre>_parent</code> and <code v-pre>_top</code> are supported):</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A-->B
    B-->C
    C-->D
    D-->E
    click A "https://www.github.com" _blank
    click B "https://www.github.com" "Open this in a new tab" _blank
    click C href "https://www.github.com" _blank
    click D href "https://www.github.com" "Open this in a new tab" _blank
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ABCDE</p>
<p>Beginners tip, a full example using interactive links in a html context:</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mermaid<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    flowchart LR
        A-->B
        B-->C
        C-->D
        click A callback "Tooltip"
        click B "https://www.github.com" "This is a link"
        click C call callback() "Tooltip"
        click D href "https://www.github.com" "This is a link"
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">var</span> <span class="token function-variable function">callback</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'A callback was triggered'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">startOnLoad</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">flowchart</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">useMaxWidth</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">htmlLabels</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">curve</span><span class="token operator">:</span> <span class="token string">'cardinal'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token literal-property property">securityLevel</span><span class="token operator">:</span><span class="token string">'loose'</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    mermaid<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="comments" tabindex="-1"><a class="header-anchor" href="#comments" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=comments" target="_blank" rel="noopener noreferrer">Comments<ExternalLinkIcon/></a></h3>
<p>Comments can be entered within a flow diagram, which will be ignored by the parser. Comments need to be on their own line, and must be prefaced with <code v-pre>%%</code> (double percent signs). Any text after the start of the comment to the next newline will be treated as a comment, including any flow syntax</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
%% this is a comment A -- text --> B{node}
   A -- text --> B -- text2 --> C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="styling-and-classes" tabindex="-1"><a class="header-anchor" href="#styling-and-classes" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=styling-and-classes" target="_blank" rel="noopener noreferrer">Styling and classes<ExternalLinkIcon/></a></h2>
<h3 id="styling-links" tabindex="-1"><a class="header-anchor" href="#styling-links" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=styling-links" target="_blank" rel="noopener noreferrer">Styling links<ExternalLinkIcon/></a></h3>
<p>It is possible to style links. For instance you might want to style a link that is going backwards in the flow. As links have no ids in the same way as nodes, some other way of deciding what style the links should be attached to is required. Instead of ids, the order number of when the link was defined in the graph is used, or use default to apply to all links. In the example below the style defined in the linkStyle statement will belong to the fourth link in the graph:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>linkStyle 3 stroke:#ff3,stroke-width:4px,color:red;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="styling-a-node" tabindex="-1"><a class="header-anchor" href="#styling-a-node" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=styling-a-node" target="_blank" rel="noopener noreferrer">Styling a node<ExternalLinkIcon/></a></h3>
<p>It is possible to apply specific styles such as a thicker border or a different background color to a node.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StartStop</p>
<h4 id="classes" tabindex="-1"><a class="header-anchor" href="#classes" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=classes" target="_blank" rel="noopener noreferrer">Classes<ExternalLinkIcon/></a></h4>
<p>More convenient than defining the style every time is to define a class of styles and attach this class to the nodes that should have a different look.</p>
<p>a class definition looks like the example below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    classDef className fill:#f9f,stroke:#333,stroke-width:4px;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Attachment of a class to a node is done as per below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    class nodeId1 className;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>It is also possible to attach a class to a list of nodes in one statement:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    class nodeId1,nodeId2 className;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>A shorter form of adding a class is to attach the classname to the node using the <code v-pre>:::</code>operator as per below:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A:::someclass --> B
    classDef someclass fill:#f96;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AB</p>
<h3 id="css-classes" tabindex="-1"><a class="header-anchor" href="#css-classes" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=css-classes" target="_blank" rel="noopener noreferrer">Css classes<ExternalLinkIcon/></a></h3>
<p>It is also possible to predefine classes in css styles that can be applied from the graph definition as in the example below:</p>
<p><strong>Example style</strong></p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.cssClass > rect</span><span class="token punctuation">{</span>
        <span class="token property">fill</span><span class="token punctuation">:</span>#FF0000<span class="token punctuation">;</span>
        <span class="token property">stroke</span><span class="token punctuation">:</span>#FFFF00<span class="token punctuation">;</span>
        <span class="token property">stroke-width</span><span class="token punctuation">:</span>4px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Example definition</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR;
    A-->B[AAA&lt;span>BBB&lt;/span>]
    B-->D
    class A cssClass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AAAABBBD</p>
<h3 id="default-class" tabindex="-1"><a class="header-anchor" href="#default-class" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=default-class" target="_blank" rel="noopener noreferrer">Default class<ExternalLinkIcon/></a></h3>
<p>If a class is named default it will be assigned to all classes without specific class definitions.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    classDef default fill:#f9f,stroke:#333,stroke-width:4px;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="basic-support-for-fontawesome" tabindex="-1"><a class="header-anchor" href="#basic-support-for-fontawesome" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=basic-support-for-fontawesome" target="_blank" rel="noopener noreferrer">Basic support for fontawesome<ExternalLinkIcon/></a></h2>
<p>It is possible to add icons from fontawesome.</p>
<p>The icons are accessed via the syntax fa:#icon class name#.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart TD
    B["fab:fa-twitter for peace"]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps?)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>for peace forbiddenA perhaps?</p>
<p>Mermaid is now only compatible with Font Awesome versions 4 and 5. Check that you are using the correct version of Font Awesome.</p>
<h2 id="graph-declarations-with-spaces-between-vertices-and-link-and-without-semicolon" tabindex="-1"><a class="header-anchor" href="#graph-declarations-with-spaces-between-vertices-and-link-and-without-semicolon" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=graph-declarations-with-spaces-between-vertices-and-link-and-without-semicolon" target="_blank" rel="noopener noreferrer">Graph declarations with spaces between vertices and link and without semicolon<ExternalLinkIcon/></a></h2>
<ul>
<li>In graph declarations, the statements also can now end without a semicolon. After release 0.2.16, ending a graph statement with semicolon is just optional. So the below graph declaration is also valid along with the old declarations of the graph.</li>
<li>A single space is allowed between vertices and the link. However there should not be any space between a vertex and its text and a link and its text. The old syntax of graph declaration will also work and hence this new feature is optional and is introduced to improve readability.</li>
</ul>
<p>Below is the new declaration of the graph edges which is also valid along with the old declaration of the graph edges.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Link textOneTwoHard edgeRound edgeDecisionResult oneResult two</p>
<h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration" aria-hidden="true">#</a> <a href="https://mermaid-js.github.io/mermaid/#/flowchart?id=configuration" target="_blank" rel="noopener noreferrer">Configuration...<ExternalLinkIcon/></a></h2>
<p>Is it possible to adjust the width of the rendered flowchart.</p>
<p>This is done by defining <strong>mermaid.flowchartConfig</strong> or by the CLI to use a JSON file with the configuration. How to use the CLI is described in the mermaidCLI page. mermaid.flowchartConfig can be set to a JSON string with config parameters or the corresponding object.</p>
</div></template>


