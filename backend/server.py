from PIL import Image, ImageDraw
from graph import Graph

# Load the indoor map image
indoor_map = Image.open("indoor_map.jpg")

# Define the coordinates of each node on the indoor map
node_coordinates = {
    'DUC': (10000234, 5567880),  
    'Gate': (68476486, 4659978),  
    'Washroom': (3068798558, 1687957),  
    'Physics': (46989436, 3078984)
}

# Define the shortest path between nodes
shortest_path = Graph.dijkstra(user_location, destination)

draw = ImageDraw.Draw(indoor_map)

for i in range(len(shortest_path) - 1):
    node1 = shortest_path[i]
    node2 = shortest_path[i + 1]
    draw.line([node_coordinates[node1], node_coordinates[node2]], fill="green", width=2)

indoor_map.save("indoor_map_with_path.jpg")

indoor_map.show()