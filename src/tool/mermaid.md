# 流程图

### 默认节点

```mermaid
flowchart LR
    id
```

> 注意 id 是框中显示的内容。

### 文本框节点

也可以在不同于 id 的框中设置文本。 如果多次这样做，它将是为将使用的节点找到的最后一个文本。 此外，如果您稍后为节点定义边，则可以省略文本定义。 渲染框时将使用先前定义的那个。

```mermaid
flowchart LR
    id1[This is the text in the box]
```

## 图形

This statement declares the direction of the Flowchart.

This declares the flowchart is oriented from top to bottom (`TD` or `TB`).

```mermaid
flowchart TD
    Start --> Stop
```

This declares the flowchart is oriented from left to right (`LR`).

```mermaid
flowchart LR
    Start --> Stop
```

## [Flowchart Orientation](https://mermaid-js.github.io/mermaid/#/flowchart?id=flowchart-orientation)

Possible FlowChart orientations are:

- TB - top to bottom
- TD - top-down/ same as top to bottom
- BT - bottom to top
- RL - right to left
- LR - left to right

## [Node shapes](https://mermaid-js.github.io/mermaid/#/flowchart?id=node-shapes)

### [A node with round edges](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-with-round-edges)

```mermaid
flowchart LR
    id1(This is the text in the box)
```



### [A stadium-shaped node](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-stadium-shaped-node)

```
flowchart LR
    id1([This is the text in the box])
```

This is the text in the box

### [A node in a subroutine shape](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-a-subroutine-shape)

```
flowchart LR
    id1[[This is the text in the box]]
```

This is the text in the box

### [A node in a cylindrical shape](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-a-cylindrical-shape)

```
flowchart LR
    id1[(Database)]
```

Database

### [A node in the form of a circle](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-the-form-of-a-circle)

```
flowchart LR
    id1((This is the text in the circle))
```

This is the text in the circle

### [A node in an asymmetric shape](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-in-an-asymmetric-shape)

```
flowchart LR
    id1>This is the text in the box]
```

This is the text in the box

Currently only the shape above is possible and not its mirror. *This might change with future releases.*

### [A node (rhombus)](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-node-rhombus)

```
flowchart LR
    id1{This is the text in the box}
```

This is the text in the box

### [A hexagon node](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-hexagon-node)

```
flowchart LR
    id1{{This is the text in the box}}
```

This is the text in the box

### [Parallelogram](https://mermaid-js.github.io/mermaid/#/flowchart?id=parallelogram)

```
flowchart TD
    id1[/This is the text in the box/]
```

This is the text in the box

### [Parallelogram alt](https://mermaid-js.github.io/mermaid/#/flowchart?id=parallelogram-alt)

```
flowchart TD
    id1[\This is the text in the box\]
```

This is the text in the box

### [Trapezoid](https://mermaid-js.github.io/mermaid/#/flowchart?id=trapezoid)

```
flowchart TD
    A[/Christmas\]
```

Christmas

### [Trapezoid alt](https://mermaid-js.github.io/mermaid/#/flowchart?id=trapezoid-alt)

```
flowchart TD
    B[\Go shopping/]
```

Go shopping

### [Double circle](https://mermaid-js.github.io/mermaid/#/flowchart?id=double-circle)

```
flowchart TD
    id1(((This is the text in the circle)))
```

This is the text in the circle

## [Links between nodes](https://mermaid-js.github.io/mermaid/#/flowchart?id=links-between-nodes)

Nodes can be connected with links/edges. It is possible to have different types of links or attach a text string to a link.

### [A link with arrow head](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-link-with-arrow-head)

```
flowchart LR
    A-->B
```

AB

### [An open link](https://mermaid-js.github.io/mermaid/#/flowchart?id=an-open-link)

```
flowchart LR
    A --- B
```

AB

### [Text on links](https://mermaid-js.github.io/mermaid/#/flowchart?id=text-on-links)

```
flowchart LR
    A-- This is the text! ---B
```

This is the text!AB

or

```
flowchart LR
    A---|This is the text|B
```

This is the textAB

### [A link with arrow head and text](https://mermaid-js.github.io/mermaid/#/flowchart?id=a-link-with-arrow-head-and-text)

```
flowchart LR
    A-->|text|B
```

textAB

or

```
flowchart LR
    A-- text -->B
```

textAB

### [Dotted link](https://mermaid-js.github.io/mermaid/#/flowchart?id=dotted-link)

```
flowchart LR;
   A-.->B;
```

AB

### [Dotted link with text](https://mermaid-js.github.io/mermaid/#/flowchart?id=dotted-link-with-text)

```
flowchart LR
   A-. text .-> B
```

textAB

### [Thick link](https://mermaid-js.github.io/mermaid/#/flowchart?id=thick-link)

```
flowchart LR
   A ==> B
```

AB

### [Thick link with text](https://mermaid-js.github.io/mermaid/#/flowchart?id=thick-link-with-text)

```
flowchart LR
   A == text ==> B
```

textAB

### [Chaining of links](https://mermaid-js.github.io/mermaid/#/flowchart?id=chaining-of-links)

It is possible declare many links in the same line as per below:

```
flowchart LR
   A -- text --> B -- text2 --> C
```

texttext2ABC

It is also possible to declare multiple nodes links in the same line as per below:

```
flowchart LR
   a --> b & c--> d
```

abcd

You can then describe dependencies in a very expressive way. Like the one-liner below:

```
flowchart TB
    A & B--> C & D
```

ABCD

If you describe the same diagram using the the basic syntax, it will take four lines. A word of warning, one could go overboard with this making the flowchart harder to read in markdown form. The Swedish word `lagom` comes to mind. It means, not too much and not too little. This goes for expressive syntaxes as well.

```
flowchart TB
    A --> C
    A --> D
    B --> C
    B --> D
```

### [New arrow types](https://mermaid-js.github.io/mermaid/#/flowchart?id=new-arrow-types)

There are new types of arrows supported as per below:

```
flowchart LR
    A --o B
    B --x C
```

ABC

### [Multi directional arrows](https://mermaid-js.github.io/mermaid/#/flowchart?id=multi-directional-arrows)

There is the possibility to use multidirectional arrows.

```
flowchart LR
    A o--o B
    B <--> C
    C x--x D
```

ABCD

### [Minimum length of a link](https://mermaid-js.github.io/mermaid/#/flowchart?id=minimum-length-of-a-link)

Each node in the flowchart is ultimately assigned to a rank in the rendered graph, i.e. to a vertical or horizontal level (depending on the flowchart orientation), based on the nodes to which it is linked. By default, links can span any number of ranks, but you can ask for any link to be longer than the others by adding extra dashes in the link definition.

In the following example, two extra dashes are added in the link from node *B* to node *E*, so that it spans two more ranks than regular links:

```
flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
```

YesNoStartIs it?OKRethinkEnd

> **Note** Links may still be made longer than the requested number of ranks by the rendering engine to accommodate other requests.

When the link label is written in the middle of the link, the extra dashes must be added on the right side of the link. The following example is equivalent to the previous one:

```
flowchart TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]
```

YesNoStartIs it?OKRethinkEnd

For dotted or thick links, the characters to add are equals signs or dots, as summed up in the following table:

| Length            | 1      | 2       | 3        |
| ----------------- | ------ | ------- | -------- |
| Normal            | `---`  | `----`  | `-----`  |
| Normal with arrow | `-->`  | `--->`  | `---->`  |
| Thick             | `===`  | `====`  | `=====`  |
| Thick with arrow  | `==>`  | `===>`  | `====>`  |
| Dotted            | `-.-`  | `-..-`  | `-...-`  |
| Dotted with arrow | `-.->` | `-..->` | `-...->` |

## [Special characters that break syntax](https://mermaid-js.github.io/mermaid/#/flowchart?id=special-characters-that-break-syntax)

It is possible to put text within quotes in order to render more troublesome characters. As in the example below:

```
flowchart LR
    id1["This is the (text) in the box"]
```

This is the (text) in the box

### [Entity codes to escape characters](https://mermaid-js.github.io/mermaid/#/flowchart?id=entity-codes-to-escape-characters)

It is possible to escape characters using the syntax exemplified here.

```
    flowchart LR
        A["A double quote:#quot;"] -->B["A dec char:#9829;"]
```

A double quote:"A dec char:♥

Numbers given are base 10, so `#` can be encoded as `#35;`. It is also supported to use HTML character names.

## [Subgraphs](https://mermaid-js.github.io/mermaid/#/flowchart?id=subgraphs)

```
subgraph title
    graph definition
end
```

An example below:

```
flowchart TB
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
```

threeonec2c1twob2b1a2a1

You can also set an explicit id for the subgraph.

```
flowchart TB
    c1-->a2
    subgraph ide1 [one]
    a1-->a2
    end
```

onea2a1c1

## [flowcharts](https://mermaid-js.github.io/mermaid/#/flowchart?id=flowcharts)

With the graphtype flowchart it is also possible to set edges to and from subgraphs as in the flowchart below.

```
flowchart TB
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
```

threeonec2c1twob2b1a2a1

## [Direction in subgraphs](https://mermaid-js.github.io/mermaid/#/flowchart?id=direction-in-subgraphs)

With the graphtype flowcharts you can use the direction statement to set the direction which the subgraph will render like in this example.

```
flowchart LR
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
```

TOPB1f1i1B2f2i2AB

## [Interaction](https://mermaid-js.github.io/mermaid/#/flowchart?id=interaction)

It is possible to bind a click event to a node, the click can lead to either a javascript callback or to a link which will be opened in a new browser tab. **Note**: This functionality is disabled when using `securityLevel='strict'` and enabled when using `securityLevel='loose'`.

```
click nodeId callback
click nodeId call callback()
```

- nodeId is the id of the node
- callback is the name of a javascript function defined on the page displaying the graph, the function will be called with the nodeId as parameter.

Examples of tooltip usage below:

```html
<script>
  var callback = function () {
      alert('A callback was triggered');
  };
</script>
```

The tooltip text is surrounded in double quotes. The styles of the tooltip are set by the class `.mermaidTooltip`.

```
flowchart LR
    A-->B
    B-->C
    C-->D
    click A callback "Tooltip for a callback"
    click B "https://www.github.com" "This is a tooltip for a link"
    click A call callback() "Tooltip for a callback"
    click B href "https://www.github.com" "This is a tooltip for a link"
```

ABCD

> **Success** The tooltip functionality and the ability to link to urls are available from version 0.5.2.

Due to limitations with how Docsify handles JavaScript callback functions, an alternate working demo for the above code can be viewed at [this jsfiddle](https://jsfiddle.net/s37cjoau/3/).

Links are opened in the same browser tab/window by default. It is possible to change this by adding a link target to the click definition (`_self`, `_blank`, `_parent` and `_top` are supported):

```
flowchart LR
    A-->B
    B-->C
    C-->D
    D-->E
    click A "https://www.github.com" _blank
    click B "https://www.github.com" "Open this in a new tab" _blank
    click C href "https://www.github.com" _blank
    click D href "https://www.github.com" "Open this in a new tab" _blank
```

ABCDE

Beginners tip, a full example using interactive links in a html context:

```html
<body>
  <div class="mermaid">
    flowchart LR
        A-->B
        B-->C
        C-->D
        click A callback "Tooltip"
        click B "https://www.github.com" "This is a link"
        click C call callback() "Tooltip"
        click D href "https://www.github.com" "This is a link"
  </div>

  <script>
    var callback = function () {
        alert('A callback was triggered');
    };
    var config = {
        startOnLoad: true,
        flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'cardinal' },
        securityLevel:'loose'
    };
    mermaid.initialize(config);
  </script>
</body>
```

### [Comments](https://mermaid-js.github.io/mermaid/#/flowchart?id=comments)

Comments can be entered within a flow diagram, which will be ignored by the parser. Comments need to be on their own line, and must be prefaced with `%%` (double percent signs). Any text after the start of the comment to the next newline will be treated as a comment, including any flow syntax

```
flowchart LR
%% this is a comment A -- text --> B{node}
   A -- text --> B -- text2 --> C
```

## [Styling and classes](https://mermaid-js.github.io/mermaid/#/flowchart?id=styling-and-classes)

### [Styling links](https://mermaid-js.github.io/mermaid/#/flowchart?id=styling-links)

It is possible to style links. For instance you might want to style a link that is going backwards in the flow. As links have no ids in the same way as nodes, some other way of deciding what style the links should be attached to is required. Instead of ids, the order number of when the link was defined in the graph is used, or use default to apply to all links. In the example below the style defined in the linkStyle statement will belong to the fourth link in the graph:

```
linkStyle 3 stroke:#ff3,stroke-width:4px,color:red;
```

### [Styling a node](https://mermaid-js.github.io/mermaid/#/flowchart?id=styling-a-node)

It is possible to apply specific styles such as a thicker border or a different background color to a node.

```
flowchart LR
    id1(Start)-->id2(Stop)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
```

StartStop

#### [Classes](https://mermaid-js.github.io/mermaid/#/flowchart?id=classes)

More convenient than defining the style every time is to define a class of styles and attach this class to the nodes that should have a different look.

a class definition looks like the example below:

```
    classDef className fill:#f9f,stroke:#333,stroke-width:4px;
```

Attachment of a class to a node is done as per below:

```
    class nodeId1 className;
```

It is also possible to attach a class to a list of nodes in one statement:

```
    class nodeId1,nodeId2 className;
```

A shorter form of adding a class is to attach the classname to the node using the `:::`operator as per below:

```
flowchart LR
    A:::someclass --> B
    classDef someclass fill:#f96;
```

AB

### [Css classes](https://mermaid-js.github.io/mermaid/#/flowchart?id=css-classes)

It is also possible to predefine classes in css styles that can be applied from the graph definition as in the example below:

**Example style**

```html
<style>
    .cssClass > rect{
        fill:#FF0000;
        stroke:#FFFF00;
        stroke-width:4px;
    }
</style>
```

**Example definition**

```
flowchart LR;
    A-->B[AAA<span>BBB</span>]
    B-->D
    class A cssClass
```

AAAABBBD

### [Default class](https://mermaid-js.github.io/mermaid/#/flowchart?id=default-class)

If a class is named default it will be assigned to all classes without specific class definitions.

```
    classDef default fill:#f9f,stroke:#333,stroke-width:4px;
```

## [Basic support for fontawesome](https://mermaid-js.github.io/mermaid/#/flowchart?id=basic-support-for-fontawesome)

It is possible to add icons from fontawesome.

The icons are accessed via the syntax fa:#icon class name#.

```
flowchart TD
    B["fab:fa-twitter for peace"]
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner);
    B-->E(A fa:fa-camera-retro perhaps?)
```

 for peace forbiddenA perhaps?

Mermaid is now only compatible with Font Awesome versions 4 and 5. Check that you are using the correct version of Font Awesome.

## [Graph declarations with spaces between vertices and link and without semicolon](https://mermaid-js.github.io/mermaid/#/flowchart?id=graph-declarations-with-spaces-between-vertices-and-link-and-without-semicolon)

- In graph declarations, the statements also can now end without a semicolon. After release 0.2.16, ending a graph statement with semicolon is just optional. So the below graph declaration is also valid along with the old declarations of the graph.
- A single space is allowed between vertices and the link. However there should not be any space between a vertex and its text and a link and its text. The old syntax of graph declaration will also work and hence this new feature is optional and is introduced to improve readability.

Below is the new declaration of the graph edges which is also valid along with the old declaration of the graph edges.

```
flowchart LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
```

Link textOneTwoHard edgeRound edgeDecisionResult oneResult two

## [Configuration...](https://mermaid-js.github.io/mermaid/#/flowchart?id=configuration)

Is it possible to adjust the width of the rendered flowchart.

This is done by defining **mermaid.flowchartConfig** or by the CLI to use a JSON file with the configuration. How to use the CLI is described in the mermaidCLI page. mermaid.flowchartConfig can be set to a JSON string with config parameters or the corresponding object.
