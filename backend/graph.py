class Graph:
    def _init_(self):
        self.graph = {}

    def add_node(self, node, coordinates):
        self.graph[node] = coordinates

    def add_edge(self, node1, node2):
        if node1 in self.graph and node2 in self.graph:
            if 'neighbors' not in self.graph[node1]:
                self.graph[node1]['neighbors'] = {}
            self.graph[node1]['neighbors'][node2] = self.calculate_distance(self.graph[node1]['coordinates'], self.graph[node2]['coordinates'])

            if 'neighbors' not in self.graph[node2]:
                self.graph[node2]['neighbors'] = {}
            self.graph[node2]['neighbors'][node1] = self.calculate_distance(self.graph[node1]['coordinates'], self.graph[node2]['coordinates'])
        else:
            raise ValueError("Node not found in the graph.")

    def calculate_distance(self, coordinates1, coordinates2):
        return ((coordinates1[0] - coordinates2[0]) ** 2 + (coordinates1[1] - coordinates2[1]) ** 2) ** 0.5

    def dijkstra(self, start_node, end_node):
        # Initialize distances
        distances = {node: float('inf') for node in self.graph}
        distances[start_node] = 0

        # Initialize predecessors
        predecessors = {}

        # Initialize priority queue
        queue = self.graph.copy()

        while queue:
            # Get node with minimum distance from start node
            current_node = min(queue, key=lambda node: distances[node])

            # Update distances to neighbors
            for neighbor, distance in self.graph[current_node]['neighbors'].items():
                if distances[current_node] + distance < distances[neighbor]:
                    distances[neighbor] = distances[current_node] + distance
                    predecessors[neighbor] = current_node

            # Remove current node from queue
            del queue[current_node]

        # Construct path
        path = []
        current_node = end_node
        while current_node != start_node:
            path.insert(0, current_node)
            current_node = predecessors[current_node]
        path.insert(0, start_node)

        return path, distances[end_node]


indoor_graph = Graph()
indoor_graph.add_node('DUC', (100, 100))
indoor_graph.add_node('Gate', (200, 200))
indoor_graph.add_node('Washroom', (300, 150))
indoor_graph.add_node('Physics', (400, 300))
indoor_graph.add_node('LiftA', (600, 700))
indoor_graph.add_node('LiftB', (600, 700))

indoor_graph.add_edge('DUC', 'Gate')
indoor_graph.add_edge('Gate', 'Washroom')
indoor_graph.add_edge('Washroom', 'LiftA')
indoor_graph.add_edge('LiftB', 'Physics')
indoor_graph.add_edge('DUC', 'LiftA')
indoor_graph.add_edge('Gate', 'LiftA')
indoor_graph.add_edge('LiftA', 'LiftB')

# Find the shortest path between two nodes using Dijkstra's algorithm
start_node = 'DUC'
end_node = 'Gate'
shortest_path, shortest_distance = indoor_graph.dijkstra(start_node, end_node)

print("Shortest Path:", shortest_path)
print("Shortest Distance:", shortest_distance)