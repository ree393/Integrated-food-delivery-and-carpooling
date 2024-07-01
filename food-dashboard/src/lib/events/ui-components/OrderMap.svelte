<script>
    import { onMount } from "svelte";

    onMount(async () => {
        let map;

        async function initMap() {
            const google = window.google;

            const { Map, InfoWindow } = await google.maps.importLibrary("maps");

            const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

            map = new Map(document.getElementById("map"), {
                center: { lat: 31.326, lng: 75.5762 }, // Jalandhar coordinates

                zoom: 14,

                mapId: "4504f8b37365c3d0",
            });

            // Create an info window to share between markers.

            const infoWindow = new InfoWindow();

            const tourStops = [
                {
                    id: 1,
                    position: { lat: 31.326, lng: 75.5762 },
                    title: "Cheese burger",
                },
                {
                    id: 2,
                    position: { lat: 31.3049, lng: 75.5672 },
                    title: "Ride to PTU",
                },
                {
                    id: 3,
                    position: { lat: 31.317, lng: 75.5788 },
                    title: "Pizza order",
                },

				{
                    id: 4,
                    position: { lat: 31.333, lng: 75.5788 },
                    title: "Ride to LPU",
                },
				{
                    id: 5,
                    position: { lat: 31.337, lng: 75.5788 },
                    title: "Spot 3",
                },
                // Add more spots as needed
            ];

            // Create the markers.

            tourStops.forEach(({ position, title }, i) => {
                const pin = new PinElement({
                    glyph: `${i + 1}`,
                    background: "#FBBC04",
                });

                const marker = new AdvancedMarkerElement({
                    position,
                    map,
                    title: `${i + 1}. ${title}`,
                    content: pin.element,
                });

                // Add a click listener for each marker, and set up the info window.

                marker.addListener("click", () => {
                    infoWindow.close();
                    infoWindow.setContent(marker.title);
                    infoWindow.open(marker.map, marker);
                });
            });
        }

        initMap();
    });
</script>

<svelte:head>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

    <script>
        ((g) => {
            var h,
                a,
                k,
                p = "The Google Maps JavaScript API",
                c = "google",
                l = "importLibrary",
                q = "__ib__",
                m = document,
                b = window;

            b = b[c] || (b[c] = {});

            var d = b.maps || (b.maps = {}),
                r = new Set(),
                e = new URLSearchParams(),
                u = () =>
                    h ||
                    (h = new Promise(async (f, n) => {
                        await (a = m.createElement("script"));

                        e.set("libraries", [...r] + "");

                        for (k in g)
                            e.set(
                                k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),

                                g[k]
                            );

                        e.set("callback", c + ".maps." + q);

                        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;

                        d[q] = f;

                        a.onerror = () => (h = n(Error(p + " could not load.")));

                        a.nonce = m.querySelector("script[nonce]")?.nonce || "";

                        m.head.append(a);
                    }));

            d[l]
                ? console.warn(p + " only loads once. Ignoring:", g)
                : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
        })({ key: "YOUR_API_KEY", v: "weekly" });
    </script>
</svelte:head>

<div id="map" />

<style>
    #map {
        width: 100%;
        height: 40rem;
        /* position: static !important; */
    }
</style>
