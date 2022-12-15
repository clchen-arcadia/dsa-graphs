/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }

  depthFirstSearchRecursive(nodesVisited = new Set([this])) {
    let values = [this.value];

    for (let neighbor of this.adjacent) {
      if (!nodesVisited.has(neighbor)) {
        nodesVisited.add(neighbor);
        values = values.concat(neighbor.depthFirstSearchRecursive(nodesVisited));
      }
    }

    return values;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertexToRemove) {
    const nodesToEdit = vertexToRemove.adjacent;
    for (let vertex of nodesToEdit) {
      vertex.adjacent.delete(vertexToRemove);
    }
    this.nodes.delete(vertexToRemove);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    if (!this.nodes.has(start)) throw new Error();

    return start.depthFirstSearchRecursive();
  }

  // Implementation with while loop:

  // depthFirstSearch(start) {
  //   const nodeStack = [start];
  //   const nodesVisited = new Set(nodeStack);
  //   const outputValues = [];

  //   while (nodeStack.length > 0) {
  //     const currNode = nodeStack.pop();

  //     outputValues.push(currNode.value);
  //     for (let neighbor of currNode.adjacent) {
  //       if (!nodesVisited.has(neighbor)) {
  //         nodeStack.push(neighbor);
  //         nodesVisited.add(neighbor);
  //       };
  //     }
  //   }

  //   return outputValues;
  // }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    const nodeQueue = [start];
    const nodesVisited = new Set(nodeQueue);
    const outputValues = [];

    while (nodeQueue.length > 0) {
      const currNode = nodeQueue.shift();

      outputValues.push(currNode.value);

      for (let neighbor of currNode.adjacent) {
        if (!nodesVisited.has(neighbor)) {
          nodeQueue.push(neighbor);
          nodesVisited.add(neighbor);
        }
      }
    }

    return outputValues;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    const nodeQueueOfTuples = [[start, 0]];
    // tuples like [node, depth]

    const nodesVisited = new Set([start]);

    while (nodeQueueOfTuples.length > 0) {
      const [currNode, currDepth] = nodeQueueOfTuples.shift();

      if (currNode === end) return currDepth;

      for (let neighbor of currNode.adjacent) {
        if (!nodesVisited.has(neighbor)) {
          nodeQueueOfTuples.push([neighbor, currDepth + 1]);
          nodesVisited.add(neighbor);
        }
      }
    }

    return undefined;
  }

  // Alternative implementation, does not work yet!

  // distanceOfShortestPath(start, end) {
  //   const nodeQueue = [start];
  //   const nodesVisited = new Set([start]);
  //   nodeQueue.push("I am special, increment depth");
  //   let currDepth = 0;

  //   while (nodeQueue.length > 0) {
  //     const currNode = nodeQueue.shift();
  //     if (currNode === end) return currDepth;
  //     if (currNode === "I am special, increment depth") {
  //       currDepth++;
  //       continue;
  //     }

  //     for (let neighbor of currNode.adjacent) {
  //       if (!nodesVisited.has(neighbor)) {
  //         nodeQueue.push(neighbor);
  //         nodesVisited.add(neighbor);
  //       }
  //     }

  //     nodeQueue.push("I am special, increment depth");
  //   }

  //   return;
  // }

  // other idea:
  // other approach like:
  // currBestPath = Infinity;
  // set currBestPath = each better path;
  // at end
  // return isFinite(currBestPath)
  // incrementing and decrementing as you go.

}

module.exports = { Graph, Node };
