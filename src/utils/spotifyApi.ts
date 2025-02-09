const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

export const getAuthUrl = () => {
  const scopes = ["playlist-read-private", "playlist-read-collaborative"];
  return (
    "https://accounts.spotify.com/authorize" +
    "?response_type=token" +
    "&client_id=" +
    encodeURIComponent(CLIENT_ID || "") +
    "&scope=" +
    encodeURIComponent(scopes.join(" ")) +
    "&redirect_uri=" +
    encodeURIComponent(REDIRECT_URI || "")
  );
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("spotifyAccessToken");
};

// Define types for the playlist details
type PlaylistDetails = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

// Define dummy playlist details
const DUMMY_PLAYLIST: PlaylistDetails = {
  id: "dummy-playlist",
  name: "Unavailable Playlist",
  description: "This playlist is currently unavailable",
  imageUrl: "https://via.placeholder.com/300",
};

export const fetchPlaylistDetails = async (
  playlistId: string,
  accessToken: string
): Promise<PlaylistDetails> => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response);
    // If response is not ok, return dummy details instead of throwing an error
    if (!response.ok) {
      console.warn(`Failed to fetch playlist details: ${response.statusText}`);
      return DUMMY_PLAYLIST;
    }

    const data = await response.json();

    // Return formatted playlist details
    return {
      id: data.id ?? DUMMY_PLAYLIST.id,
      name: data.name ?? DUMMY_PLAYLIST.name,
      description: data.description || "No description available",
      imageUrl: data.images[0]?.url || "https://via.placeholder.com/300",
    };
  } catch (error) {
    // Log the error but return dummy details instead of throwing
    console.error("Error fetching playlist details:", error);
    return DUMMY_PLAYLIST;
  }
};
